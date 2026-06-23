@echo off
REM ============================================================
REM  Knights Developments -> github.com/ZKOWorld/knightsdevelopments
REM  Double-click to initialise the repo and push everything.
REM  If a GitHub sign-in window appears, complete it to authorise.
REM ============================================================
cd /d "%~dp0"

echo Cleaning any half-made git folder...
if exist ".git" rmdir /s /q ".git"

echo Initialising repository...
git init
git branch -M main
git config user.email "oliver.oi.designs@gmail.com"
git config user.name "ZKO Creative"

echo Staging files (the .gitignore keeps the video and boards out)...
git add -A
git commit -m "Knights redesign: research, plans, homepage + projects + project pages"

echo Connecting to GitHub...
git remote add origin https://github.com/ZKOWorld/knightsdevelopments.git

echo Pushing...
git push -u origin main

echo.
echo ============================================================
echo  Done. If it asked you to sign in to GitHub, run it once more
echo  after signing in and it will finish the push.
echo ============================================================
pause
