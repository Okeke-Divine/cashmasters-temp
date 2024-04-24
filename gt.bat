@echo off
git add .
set /p commit_msg="Type in the commit message: "
git commit -m "%commit_msg%"
