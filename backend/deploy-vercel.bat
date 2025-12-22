@echo off
REM Script to deploy the backend to Vercel

REM Navigate to the backend directory
cd /d "%~dp0"

REM Check if vercel is installed
where vercel >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

REM Deploy to Vercel
echo Deploying to Vercel...
vercel --prod

echo Deployment completed!
pause