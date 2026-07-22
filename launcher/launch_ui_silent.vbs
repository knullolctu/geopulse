Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
' Get the directory where this VBS script is located
strPath = FSO.GetParentFolderName(WScript.ScriptFullName)

' Command to run PowerShell hidden without any flash
' -ExecutionPolicy Bypass ensures it runs even if restricted
' -WindowStyle Hidden is the secondary guard
strCommand = "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & strPath & "\GeoPulseLauncher.ps1"""

' Run the command with 0 (Hidden)
WshShell.Run strCommand, 0, false

Set WshShell = Nothing
Set FSO = Nothing
