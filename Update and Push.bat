@echo off
REM ============================================================
REM  Knights Developments -> github.com/ZKOWorld/knightsdevelopments
REM  Double-click to commit the latest changes and push to GitHub.
REM  (Uses the existing repo - does NOT wipe history.)
REM ============================================================
cd /d "%~dp0"

if not exist ".git" (
  echo No git repo found here yet.
  echo Run "Setup and Push to GitHub.bat" first, then use this one.
  pause
  exit /b
)

echo Staging changes...
git add -A

echo Committing...
git commit -m "Make the new hero + loader the homepage (index.html)"

echo Pushing to GitHub...
git push origin main

echo.
echo ============================================================
echo  Done. Vercel will redeploy automatically from this push.
echo  If a GitHub sign-in window appeared, complete it and run
echo  this file once more to finish.
echo ============================================================
pause
