@echo off
:: Launch via VBS to ensure zero terminal flash
start /b wscript.exe "%~dp0launch_ui_silent.vbs"
exit
