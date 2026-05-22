@echo off
cd /d "%~dp0"

if exist ".git\index.lock" (
  del /f ".git\index.lock"
  echo Removed index.lock
)

git add -A
git commit -m "Update"
git push origin master
echo Done.
pause
