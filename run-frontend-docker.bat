@echo off
setlocal
set "FRONTEND=%~dp0frontend"
set "DOCKER_CMD=C:\Program Files\Docker\Docker\resources\bin\docker.exe"
if not exist "%DOCKER_CMD%" set "DOCKER_CMD=docker.exe"

cd /d "%FRONTEND%"
"%DOCKER_CMD%" run --rm -it -p 5173:5173 -v "%FRONTEND%:/app" -w /app -e VITE_API_TARGET=http://host.docker.internal:8080 node:24-slim npm run dev -- --host 0.0.0.0
pause
