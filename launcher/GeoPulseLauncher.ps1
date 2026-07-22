Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Dynamic Paths: Assumes launcher and geopulse are in the same parent folder
$projectDir = (Get-Item "$PSScriptRoot\..").FullName
$serverProc = $null
$tunnelProc = $null
$tunnelJob  = $null
$ngrokExe   = "$PSScriptRoot\ngrok.exe"

# Detect LAN IP at startup
# Detect all IPv4 addresses
function Get-NetworkIPs {
    return (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
        $_.PrefixOrigin -eq 'Dhcp' -or $_.PrefixOrigin -eq 'Manual'
    } | Where-Object {
        $_.IPAddress -notmatch '^127\.'
    } | Select-Object -ExpandProperty IPAddress)
}
$allIPs = Get-NetworkIPs

# ─── FORM DESIGN ───
$form = New-Object System.Windows.Forms.Form
$form.Text = "GeoPulse Control Center"
$form.Size = New-Object System.Drawing.Size(720, 700) # Increased height for more URLs
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedDialog"
$form.MaximizeBox = $false
$form.BackColor = [System.Drawing.Color]::FromArgb(248, 250, 252)

# Custom Fonts
$fontBold  = New-Object System.Drawing.Font("Arial Black", 14)
$fontSmall = New-Object System.Drawing.Font("Arial Black", 8)
$fontMono  = New-Object System.Drawing.Font("Consolas", 8)

# ─── TITLE ───────────────────────────────────────────────────────────────────
$label = New-Object System.Windows.Forms.Label
$label.Text      = "GEOPULSE"
$label.Font      = $fontBold
$label.Size      = New-Object System.Drawing.Size(200, 35)
$label.Location  = New-Object System.Drawing.Point(220, 10)
$label.ForeColor = [System.Drawing.Color]::FromArgb(15, 23, 42)
$form.Controls.Add($label)

# ─── CONSOLE LOG (left panel) ─────────────────────────────────────────────────
$logTitle = New-Object System.Windows.Forms.Label
$logTitle.Text      = "CONSOLE LOG"
$logTitle.Font      = $fontSmall
$logTitle.Location  = New-Object System.Drawing.Point(10, 12)
$logTitle.Size      = New-Object System.Drawing.Size(195, 20)
$logTitle.ForeColor = [System.Drawing.Color]::FromArgb(15, 23, 42)
$form.Controls.Add($logTitle)

$logBox = New-Object System.Windows.Forms.TextBox
$logBox.Multiline   = $true
$logBox.ReadOnly    = $true
$logBox.ScrollBars  = "Vertical"
$logBox.BackColor   = [System.Drawing.Color]::FromArgb(15, 23, 42)
$logBox.ForeColor   = [System.Drawing.Color]::FromArgb(134, 239, 172)
$logBox.Font        = $fontMono
$logBox.Size        = New-Object System.Drawing.Size(200, 485) # Taller log
$logBox.Location    = New-Object System.Drawing.Point(10, 35)
$logBox.BorderStyle = "FixedSingle"
$form.Controls.Add($logBox)

# ─── URLS (bottom panel) ────────────────────────────────────────────────────
$urlPanel = New-Object System.Windows.Forms.Panel
$urlPanel.Location = New-Object System.Drawing.Point(10, 525)
$urlPanel.Size = New-Object System.Drawing.Size(685, 120)
$urlPanel.BorderStyle = "None"
$form.Controls.Add($urlPanel)

$urlTitle = New-Object System.Windows.Forms.Label
$urlTitle.Text      = "ACTIVE NETWORK NODES:"
$urlTitle.Font      = $fontSmall
$urlTitle.Location  = New-Object System.Drawing.Point(0, 0)
$urlTitle.Size      = New-Object System.Drawing.Size(200, 20)
$urlTitle.ForeColor = [System.Drawing.Color]::FromArgb(15, 23, 42)
$urlPanel.Controls.Add($urlTitle)

$allUrlLinks = @()

# Helper to add URL Link
function Add-UrlLink($label, $url, $y) {
    $link = New-Object System.Windows.Forms.LinkLabel
    $link.Text     = "$($label): $($url)"
    $link.Font     = $fontSmall
    $link.Location = New-Object System.Drawing.Point(5, $y)
    $link.AutoSize = $true
    $link.Visible  = $false
    $link.LinkColor = [System.Drawing.Color]::SlateGray
    $link.Add_LinkClicked({ Start-Process $url })
    $urlPanel.Controls.Add($link)
    return $link
}

# 1. Localhost
$linkLocal = Add-UrlLink "Local  " "http://localhost:3000" 20
$allUrlLinks += @{ Link = $linkLocal; Host = "127.0.0.1" }

# 2. Network IPs
$yPos = 40
foreach ($ip in $allIPs) {
    $link = Add-UrlLink "Network" "http://${ip}:3000" $yPos
    $allUrlLinks += @{ Link = $link; Host = $ip }
    $yPos += 20
}

# 3. Tunnel URL
$linkTunnel = New-Object System.Windows.Forms.LinkLabel
$linkTunnel.Text     = "Tunnel : detecting..."
$linkTunnel.Font     = $fontSmall
$linkTunnel.Location = New-Object System.Drawing.Point(5, $yPos)
$linkTunnel.AutoSize = $true
$linkTunnel.Visible  = $false
$linkTunnel.LinkColor = [System.Drawing.Color]::SlateGray
$linkTunnel.Add_LinkClicked({ if ($script:tunnelUrl) { Start-Process $script:tunnelUrl } })
$urlPanel.Controls.Add($linkTunnel)

# ─── RESPONSIVE ACCESS SECTION (MOBILE) ─────────────────────────────────────
$respTitle = New-Object System.Windows.Forms.Label
$respTitle.Text      = "MOBILE RESPONSIVE ACCESS:"
$respTitle.Font      = $fontSmall
$respTitle.Location  = New-Object System.Drawing.Point(0, $yPos + 25)
$respTitle.Size      = New-Object System.Drawing.Size(250, 20)
$respTitle.ForeColor = [System.Drawing.Color]::FromArgb(79, 70, 229)
$urlPanel.Controls.Add($respTitle)

$linkResponsive = New-Object System.Windows.Forms.Label
$linkResponsive.Text     = "WAITING FOR NETWORK SYNC..."
$linkResponsive.Font     = New-Object System.Drawing.Font("Consolas", 9, [System.Drawing.FontStyle]::Bold)
$linkResponsive.Location = New-Object System.Drawing.Point(5, $yPos + 45)
$linkResponsive.Size     = New-Object System.Drawing.Size(600, 20)
$linkResponsive.ForeColor = [System.Drawing.Color]::Gray
$urlPanel.Controls.Add($linkResponsive)

# Update timer to handle responsive link selection
$healthTimer.Add_Tick({
    $bestIP = ""
    foreach ($item in $allUrlLinks) {
        if ($item.Link.LinkColor.Name -eq "ff22c35e" -or $item.Link.LinkColor -eq [System.Drawing.Color]::FromArgb(34, 197, 94)) {
            if ($item.Host -notmatch '^127\.') {
                $bestIP = $item.Host
                break
            }
        }
    }
    if ($bestIP) {
        $linkResponsive.Text = "http://${bestIP}:3000"
        $linkResponsive.ForeColor = [System.Drawing.Color]::FromArgb(79, 70, 229)
    } elseif ($script:tunnelUrl) {
        $linkResponsive.Text = $script:tunnelUrl
        $linkResponsive.ForeColor = [System.Drawing.Color]::FromArgb(79, 70, 229)
    } else {
        $linkResponsive.Text = "OFFLINE OR LOCAL ONLY"
        $linkResponsive.ForeColor = [System.Drawing.Color]::Gray
    }
})

# ─── TAB CONTROL (right panel) ───────────────────────────────────────────────
$tabControl = New-Object System.Windows.Forms.TabControl
$tabControl.Size     = New-Object System.Drawing.Size(475, 430)
$tabControl.Location = New-Object System.Drawing.Point(218, 50)
$form.Controls.Add($tabControl)

# Tab 1: Server
$tabServer = New-Object System.Windows.Forms.TabPage
$tabServer.Text     = "Server Control"
$tabServer.BackColor = [System.Drawing.Color]::White
$tabControl.TabPages.Add($tabServer)

# Tab 2: Settings
$tabSettings = New-Object System.Windows.Forms.TabPage
$tabSettings.Text     = "Settings"
$tabSettings.BackColor = [System.Drawing.Color]::White
$tabControl.TabPages.Add($tabSettings)

# ─── STATUS BADGE ────────────────────────────────────────────────────────────
$status = New-Object System.Windows.Forms.Label
$status.Text      = "STATUS: STOPPED"
$status.Font      = $fontSmall
$status.Size      = New-Object System.Drawing.Size(430, 20)
$status.Location  = New-Object System.Drawing.Point(15, 15)
$status.ForeColor = [System.Drawing.Color]::Gray
$tabServer.Controls.Add($status)

# Production Mode Toggle
$chkProd = New-Object System.Windows.Forms.CheckBox
$chkProd.Text     = "PRODUCTION MODE (Optimized)"
$chkProd.Font     = $fontSmall
$chkProd.Location = New-Object System.Drawing.Point(15, 40)
$chkProd.Size     = New-Object System.Drawing.Size(430, 20)
$chkProd.ForeColor = [System.Drawing.Color]::FromArgb(79, 70, 229)
$chkProd.Cursor    = [System.Windows.Forms.Cursors]::Hand
$tabServer.Controls.Add($chkProd)



# ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
$configFile = "$PSScriptRoot\geopulse.config.json"

function Load-Config {
    if (Test-Path $configFile) {
        try { return Get-Content $configFile | ConvertFrom-Json } catch {}
    }
    return [PSCustomObject]@{ ngrokToken = ""; ngrokDomain = "" }
}
function Save-Config($token, $domain) {
    [PSCustomObject]@{ ngrokToken = $token; ngrokDomain = $domain } | ConvertTo-Json | Set-Content $configFile
}
$cfg = Load-Config

$lbToken = New-Object System.Windows.Forms.Label
$lbToken.Text     = "NGROK AUTH TOKEN:"
$lbToken.Font     = $fontSmall
$lbToken.Location = New-Object System.Drawing.Point(15, 20)
$lbToken.Size     = New-Object System.Drawing.Size(430, 20)
$tabSettings.Controls.Add($lbToken)

$txtToken = New-Object System.Windows.Forms.TextBox
$txtToken.Font        = $fontMono
$txtToken.Location    = New-Object System.Drawing.Point(15, 44)
$txtToken.Size        = New-Object System.Drawing.Size(435, 24)
$txtToken.Text        = $cfg.ngrokToken
$txtToken.PasswordChar = '*'
$tabSettings.Controls.Add($txtToken)

$chkShowToken = New-Object System.Windows.Forms.CheckBox
$chkShowToken.Text     = "Show token"
$chkShowToken.Font     = $fontSmall
$chkShowToken.Location = New-Object System.Drawing.Point(15, 72)
$chkShowToken.AutoSize = $true
$chkShowToken.Add_CheckedChanged({
    if ($chkShowToken.Checked) { $txtToken.PasswordChar = [char]0 }
    else { $txtToken.PasswordChar = '*' }
})
$tabSettings.Controls.Add($chkShowToken)

$lbDomain = New-Object System.Windows.Forms.Label
$lbDomain.Text     = "NGROK STATIC DOMAIN:"
$lbDomain.Font     = $fontSmall
$lbDomain.Location = New-Object System.Drawing.Point(15, 105)
$lbDomain.Size     = New-Object System.Drawing.Size(430, 20)
$tabSettings.Controls.Add($lbDomain)

$lbDomainHint = New-Object System.Windows.Forms.Label
$lbDomainHint.Text     = "e.g. geopulse-knull.ngrok-free.app  (leave blank for random URL)"
$lbDomainHint.Font     = New-Object System.Drawing.Font("Consolas", 7)
$lbDomainHint.ForeColor = [System.Drawing.Color]::Gray
$lbDomainHint.Location = New-Object System.Drawing.Point(15, 125)
$lbDomainHint.Size     = New-Object System.Drawing.Size(435, 16)
$tabSettings.Controls.Add($lbDomainHint)

$txtDomain = New-Object System.Windows.Forms.TextBox
$txtDomain.Font     = $fontMono
$txtDomain.Location = New-Object System.Drawing.Point(15, 144)
$txtDomain.Size     = New-Object System.Drawing.Size(435, 24)
$txtDomain.Text     = $cfg.ngrokDomain
$tabSettings.Controls.Add($txtDomain)

$btnSaveCfg = New-Object System.Windows.Forms.Button
$btnSaveCfg.Text      = "SAVE SETTINGS"
$btnSaveCfg.Font      = $fontSmall
$btnSaveCfg.Size      = New-Object System.Drawing.Size(435, 45)
$btnSaveCfg.Location  = New-Object System.Drawing.Point(15, 185)
$btnSaveCfg.FlatStyle = "Flat"
$btnSaveCfg.BackColor = [System.Drawing.Color]::FromArgb(79, 70, 229)
$btnSaveCfg.ForeColor = [System.Drawing.Color]::White
$btnSaveCfg.FlatAppearance.BorderSize  = 3
$btnSaveCfg.FlatAppearance.BorderColor = [System.Drawing.Color]::Black
$btnSaveCfg.Cursor    = [System.Windows.Forms.Cursors]::Hand
$btnSaveCfg.Add_Click({
    Save-Config $txtToken.Text $txtDomain.Text
    Log "Settings saved."
    [System.Windows.Forms.MessageBox]::Show("Settings saved!", "Saved")
})
$tabSettings.Controls.Add($btnSaveCfg)

$lbNgrokHelp = New-Object System.Windows.Forms.Label
$lbNgrokHelp.Text = "Get free token & static domain at ngrok.com"
$lbNgrokHelp.Font = New-Object System.Drawing.Font("Consolas", 8)
$lbNgrokHelp.ForeColor = [System.Drawing.Color]::Gray
$lbNgrokHelp.Location = New-Object System.Drawing.Point(15, 245)
$lbNgrokHelp.AutoSize = $true
$tabSettings.Controls.Add($lbNgrokHelp)

# ─── NGROK AUTO-INSTALLER ───────────────────────────────────────────────────
function Install-Ngrok {
    $url = "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip"
    $zip = "$PSScriptRoot\ngrok.zip"
    
    Log "Downloading ngrok..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $zip
        Log "Extracting ngrok..."
        Expand-Archive -Path $zip -DestinationPath $PSScriptRoot -Force
        Remove-Item $zip
        Log "ngrok installed successfully."
        return $true
    } catch {
        Log "Error installing ngrok: $_"
        return $false
    }
}

# ─── BUTTON HELPER ───────────────────────────────────────────────────────────
function Create-Button($text, $color, $y, $parent) {
    $btn = New-Object System.Windows.Forms.Button
    $btn.Text = $text.ToUpper()
    $btn.Font = $fontSmall
    $btn.Size = New-Object System.Drawing.Size(435, 48)
    $btn.Location = New-Object System.Drawing.Point(15, $y)
    $btn.FlatStyle = "Flat"
    $btn.BackColor = $color
    $btn.ForeColor = [System.Drawing.Color]::White
    $btn.FlatAppearance.BorderSize = 3
    $btn.FlatAppearance.BorderColor = [System.Drawing.Color]::Black
    $btn.Cursor = [System.Windows.Forms.Cursors]::Hand
    $parent.Controls.Add($btn)
    return $btn
}

# ─── SERVER TAB BUTTONS ──────────────────────────────────────────────────────
$btnStart    = Create-Button "Start Server"           ([System.Drawing.Color]::FromArgb(79, 70, 229))   85 $tabServer
$btnStop     = Create-Button "Stop Server"            ([System.Drawing.Color]::FromArgb(244, 63, 94))  140 $tabServer
$btnRestart  = Create-Button "Restart Server"         ([System.Drawing.Color]::FromArgb(16, 185, 129)) 195 $tabServer
$btnTunnel   = Create-Button "Start Tunnel (ngrok)"   ([System.Drawing.Color]::FromArgb(6, 182, 212))  250 $tabServer
$btnMinimize = Create-Button "Minimize to Tray"       ([System.Drawing.Color]::FromArgb(100, 116, 139)) 305 $tabServer
$btnExit     = Create-Button "Exit Application"       ([System.Drawing.Color]::FromArgb(30, 41, 59))   360 $tabServer

# Initial button states
$btnStop.Enabled    = $false
$btnRestart.Enabled = $false

# ─── FOOTER CREDITS ──────────────────────────────────────────────────────────
$credits = New-Object System.Windows.Forms.Label
$credits.Text      = "DEVELOPED BY KNULL  |  KEVINGESMANLIBREA@GMAIL.COM"
$credits.Font      = New-Object System.Drawing.Font("Arial Black", 6)
$credits.ForeColor = [System.Drawing.Color]::Black
$credits.TextAlign = "MiddleCenter"
$credits.Size      = New-Object System.Drawing.Size(690, 20)
$credits.Location  = New-Object System.Drawing.Point(10, 585)
$form.Controls.Add($credits)

# ─── TRAY ICON ───────────────────────────────────────────────────────────────
$notifyIcon = New-Object System.Windows.Forms.NotifyIcon
$notifyIcon.Icon    = [System.Drawing.Icon]::ExtractAssociatedIcon((Get-Process -Id $PID).Path)
$notifyIcon.Text    = "GeoPulse Control"
$notifyIcon.Visible = $false

$notifyIcon.Add_DoubleClick({
    $form.Show()
    $form.WindowState = "Normal"
    $notifyIcon.Visible = $false
})

# ─── LOGGING HELPER ──────────────────────────────────────────────────────────
function Log($msg) {
    $ts = (Get-Date).ToString("HH:mm:ss")
    $logBox.AppendText("[$ts] $msg`r`n")
    $logBox.SelectionStart = $logBox.Text.Length
    $logBox.ScrollToCaret()
}

# ─── CORE LOGIC ──────────────────────────────────────────────────────────────

# ─── HEALTH CHECK TIMER ──────────────────────────────────────────────────────
$healthTimer = New-Object System.Windows.Forms.Timer
$healthTimer.Interval = 3000
$healthTimer.Add_Tick({
    foreach ($item in $allUrlLinks) {
        $link = $item.Link
        $host = $item.Host
        if ($link.Visible) {
            $tcp = New-Object System.Net.Sockets.TcpClient
            $connect = $tcp.BeginConnect($host, 3000, $null, $null)
            $wait = $connect.AsyncWaitHandle.WaitOne(150, $false)
            if ($wait) {
                try { $tcp.EndConnect($connect); $link.LinkColor = [System.Drawing.Color]::FromArgb(34, 197, 94) } catch {}
            } else {
                $link.LinkColor = [System.Drawing.Color]::SlateGray
            }
            $tcp.Close()
        }
    }
})

function Start-Server {
    if ($serverProc -eq $null -or $serverProc.HasExited) {
        $status.Text      = "STATUS: STARTING..."
        $status.ForeColor = [System.Drawing.Color]::Orange
        Log "--- Starting GeoPulse Stack ---"

        # Start Node server
        if ($chkProd.Checked) {
            Log "Launching pnpm start (PRODUCTION)..."
            $serverProc = Start-Process "pnpm" -ArgumentList "start" -WorkingDirectory $projectDir -WindowStyle Hidden -PassThru
        } else {
            Log "Launching pnpm dev (DEVELOPMENT)..."
            $serverProc = Start-Process "pnpm" -ArgumentList "dev" -WorkingDirectory $projectDir -WindowStyle Hidden -PassThru
        }

        $status.Text      = "STATUS: RUNNING"
        $status.ForeColor = [System.Drawing.Color]::Green
        
        # Show all links
        foreach ($item in $allUrlLinks) { $item.Link.Visible = $true }
        
        $btnStart.Enabled   = $false
        $btnStop.Enabled    = $true
        $btnRestart.Enabled = $true
        $chkProd.Enabled    = $false
        Log "Server active on all detected network nodes."
        $healthTimer.Start()
    }
}

function Stop-Server {
    $status.Text      = "STATUS: STOPPING..."
    $status.ForeColor = [System.Drawing.Color]::Orange
    Log "--- Stopping GeoPulse Stack ---"

    taskkill /F /T /IM node.exe  >$null 2>&1; Log "node.exe killed."
    taskkill /F /T /IM pnpm.exe  >$null 2>&1; Log "pnpm.exe killed."

    $serverProc = $null
    $status.Text      = "STATUS: STOPPED"
    $status.ForeColor = [System.Drawing.Color]::Gray
    
    # Hide all links
    foreach ($item in $allUrlLinks) { 
        $item.Link.Visible = $false
        $item.Link.LinkColor = [System.Drawing.Color]::SlateGray
    }
    $healthTimer.Stop()

    $btnStart.Enabled   = $true
    $btnStop.Enabled    = $false
    $btnRestart.Enabled = $false
    $chkProd.Enabled    = $true
    Log "All services stopped."
    Stop-Tunnel
}

# ─── TUNNEL LOGIC (ngrok) ────────────────────────────────────────────────────
$script:tunnelUrl = ""

# Timer polls ngrok local API every 2s to detect the public URL
$tunnelTimer = New-Object System.Windows.Forms.Timer
$tunnelTimer.Interval = 2000
$tunnelTimer.Add_Tick({
    if ($script:tunnelJob -ne $null) {
        try {
            $res = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -ErrorAction Stop
            $url = ($res.tunnels | Where-Object { $_.proto -eq "https" } | Select-Object -First 1).public_url
            if ($url -and $url -ne $script:tunnelUrl) {
                $script:tunnelUrl   = $url
                $linkTunnel.Text    = "Tunnel: $url"
                $linkTunnel.Visible = $true
                Log "Tunnel URL: $url"
            }
        } catch { <# ngrok not ready yet #> }
    }
})

function Start-Tunnel {
    if (-not (Test-Path $ngrokExe)) {
        if (-not (Get-Command ngrok -ErrorAction SilentlyContinue)) {
            $res = [System.Windows.Forms.MessageBox]::Show("ngrok not found. Would you like to install it locally now?", "Install ngrok", [System.Windows.Forms.MessageBoxButtons]::YesNo, [System.Windows.Forms.MessageBoxIcon]::Question)
            if ($res -eq "Yes") {
                if (-not (Install-Ngrok)) {
                    [System.Windows.Forms.MessageBox]::Show("Failed to install ngrok automatically. Please install it manually.", "Error")
                    return
                }
            } else {
                return
            }
        } else {
            # Use system ngrok if local not found but system one exists
            $script:activeNgrok = "ngrok"
        }
    } else {
        $script:activeNgrok = $ngrokExe
    }
    
    if (-not $script:activeNgrok) { $script:activeNgrok = $ngrokExe }
    $token  = $txtToken.Text.Trim()
    $domain = $txtDomain.Text.Trim()
    if (-not $token) {
        Log "No ngrok auth token set. Go to Settings tab."
        [System.Windows.Forms.MessageBox]::Show(
            "Please enter your ngrok auth token in the Settings tab first.",
            "Auth Token Required",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Warning)
        return
    }
    # Configure auth token silently
    & $script:activeNgrok config add-authtoken $token 2>$null | Out-Null

    # Build args array properly (avoids $args reserved variable collision)
    if ($domain) {
        $ngrokArgList = @("http", "--domain=$domain", "127.0.0.1:3000")
        Log "Starting ngrok tunnel ($domain)..."
    } else {
        $ngrokArgList = @("http", "127.0.0.1:3000")
        Log "Starting ngrok tunnel (random URL)..."
    }
    $linkTunnel.Text    = "Tunnel: detecting..."
    $linkTunnel.Visible = $true

    $script:tunnelJob = Start-Job -ScriptBlock {
        param($argList, $exe)
        & $exe @argList
    } -ArgumentList $ngrokArgList, $script:activeNgrok

    $tunnelTimer.Start()
    $btnTunnel.Text      = "STOP TUNNEL"
    $btnTunnel.BackColor = [System.Drawing.Color]::FromArgb(239, 68, 68)
}

function Stop-Tunnel {
    if ($script:tunnelJob -ne $null) {
        Stop-Job   -Job $script:tunnelJob
        Remove-Job -Job $script:tunnelJob -Force
        $script:tunnelJob  = $null
        $tunnelTimer.Stop()
        taskkill /F /IM ngrok.exe >$null 2>&1
        $linkTunnel.Visible = $false
        $script:tunnelUrl   = ""
        $btnTunnel.Text      = "START TUNNEL (NGROK)"
        $btnTunnel.BackColor = [System.Drawing.Color]::FromArgb(6, 182, 212)
        Log "Tunnel stopped."
    }
}

# ─── EVENT HANDLERS ──────────────────────────────────────────────────────────

$btnStart.Add_Click({ Start-Server })
$btnStop.Add_Click({ Stop-Server })
$btnTunnel.Add_Click({
    if ($script:tunnelJob -ne $null) { Stop-Tunnel } else { Start-Tunnel }
})

$btnRestart.Add_Click({
    Log "--- Restarting Server ---"
    Stop-Server
    Start-Server
})

$btnMinimize.Add_Click({
    $form.Hide()
    $notifyIcon.Visible = $true
    $notifyIcon.ShowBalloonTip(2000, "GeoPulse", "Running in background", "Info")
    Log "Minimized to tray."
})

$btnExit.Add_Click({
    $result = [System.Windows.Forms.MessageBox]::Show(
        "Stop the server and exit?", "Confirm Exit",
        [System.Windows.Forms.MessageBoxButtons]::YesNo,
        [System.Windows.Forms.MessageBoxIcon]::Question)
    if ($result -eq "Yes") {
        Stop-Server
        $notifyIcon.Visible = $false
        $form.Close()
    }
})

# ─── CLOSE (X) BUTTON → ask minimize or exit ─────────────────────────────────
$form.Add_FormClosing({
    param($sender, $e)
    if ($e.CloseReason -eq [System.Windows.Forms.CloseReason]::UserClosing) {
        $result = [System.Windows.Forms.MessageBox]::Show(
            "Do you want to exit the application?`nClick 'No' to minimize to tray instead.",
            "Close GeoPulse Control",
            [System.Windows.Forms.MessageBoxButtons]::YesNo,
            [System.Windows.Forms.MessageBoxIcon]::Question)

        if ($result -eq [System.Windows.Forms.DialogResult]::Yes) {
            Stop-Server
            $notifyIcon.Visible = $false
            # let form close normally
        } else {
            $e.Cancel = $true          # cancel the close
            $form.Hide()
            $notifyIcon.Visible = $true
            $notifyIcon.ShowBalloonTip(2000, "GeoPulse", "Running in background", "Info")
            Log "Minimized to tray via X button."
        }
    }
})

Log "GeoPulse Control Center ready."
[System.Windows.Forms.Application]::Run($form)
