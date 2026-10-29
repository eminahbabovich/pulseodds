@echo off
setlocal
set "ROOT=%~dp0"
set "BACKEND=%ROOT%demo"
set "MAVEN_CMD="

for /f "delims=" %%M in ('where mvn.cmd 2^>nul') do (
    set "MAVEN_CMD=%%M"
    goto :maven_ready
)
if exist "C:\Program Files\JetBrains\IntelliJ IDEA 2025.2.4\plugins\maven\lib\maven3\bin\mvn.cmd" set "MAVEN_CMD=C:\Program Files\JetBrains\IntelliJ IDEA 2025.2.4\plugins\maven\lib\maven3\bin\mvn.cmd"

:maven_ready
if defined MAVEN_CMD (
    cd /d "%BACKEND%"
    call "%MAVEN_CMD%" spring-boot:run
    pause
    exit /b %errorlevel%
)

set "POWERSHELL_CMD="
for /f "delims=" %%P in ('where powershell.exe 2^>nul') do (
    set "POWERSHELL_CMD=%%P"
    goto :powershell_ready
)
if exist "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" set "POWERSHELL_CMD=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"

:powershell_ready
if defined POWERSHELL_CMD (
    cd /d "%BACKEND%"
    call mvnw.cmd spring-boot:run
    pause
    exit /b %errorlevel%
)

set "DOCKER_CMD=C:\Program Files\Docker\Docker\resources\bin\docker.exe"
if not exist "%DOCKER_CMD%" set "DOCKER_CMD=docker.exe"
"%DOCKER_CMD%" run --rm -it -p 8080:8080 -v "%BACKEND%:/app" -w /app maven:3.9-eclipse-temurin-21 mvn spring-boot:run
pause
