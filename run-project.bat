@echo off
setlocal
title PulseOdds - Full Stack

set "ROOT=%~dp0"
set "BACKEND=%ROOT%demo"
set "FRONTEND=%ROOT%frontend"
set "DOCKER_CMD="
set "MAVEN_CMD="

set "JAVA_HOME="
if exist "C:\Program Files\Java\jdk-25\bin\java.exe" set "JAVA_HOME=C:\Program Files\Java\jdk-25"
if not defined JAVA_HOME if exist "C:\Program Files\Java\jdk-24\bin\java.exe" set "JAVA_HOME=C:\Program Files\Java\jdk-24"
if not defined JAVA_HOME if exist "C:\Program Files\Java\jdk-23\bin\java.exe" set "JAVA_HOME=C:\Program Files\Java\jdk-23"
if not defined JAVA_HOME if exist "C:\Program Files\Java\jdk-21\bin\java.exe" set "JAVA_HOME=C:\Program Files\Java\jdk-21"
if not defined JAVA_HOME (
    for /f "delims=" %%J in ('where java 2^>nul') do (
        set "JAVA_EXE=%%J"
        goto :java_found
    )
    echo Java nije pronadjena. IntelliJ je mozda koristi interno, ali Java nije dodana u PATH.
    echo Ocekivana putanja je C:\Program Files\Java\jdk-25 ili jdk-21.
    pause
    exit /b 1
)
:java_found
if defined JAVA_HOME set "PATH=%JAVA_HOME%\bin;%PATH%"
java -version

set "NODE_HOME="
if exist "C:\Program Files\nodejs\npm.cmd" set "NODE_HOME=C:\Program Files\nodejs"
if not defined NODE_HOME if exist "%LocalAppData%\Programs\nodejs\npm.cmd" set "NODE_HOME=%LocalAppData%\Programs\nodejs"
if not defined NODE_HOME if exist "%AppData%\npm\npm.cmd" set "NODE_HOME=%AppData%\npm"
if not defined NODE_HOME if exist "C:\nvm\current\npm.cmd" set "NODE_HOME=C:\nvm\current"
if not defined NODE_HOME if exist "%AppData%\nvm\current\npm.cmd" set "NODE_HOME=%AppData%\nvm\current"
if defined NODE_HOME set "PATH=%NODE_HOME%;%PATH%"
set "NPM_CMD="
for /f "delims=" %%N in ('where npm.cmd 2^>nul') do (
    set "NPM_CMD=%%N"
    goto :npm_found
)
if not defined NPM_CMD (
    for /f "tokens=2,*" %%A in ('reg query "HKLM\SOFTWARE\Node.js" /v InstallPath 2^>nul ^| findstr InstallPath') do set "NODE_HOME=%%B"
    if defined NODE_HOME if exist "%NODE_HOME%\npm.cmd" set "PATH=%NODE_HOME%;%PATH%"
    for /f "delims=" %%N in ('where npm.cmd 2^>nul') do (
        set "NPM_CMD=%%N"
        goto :npm_found
    )
)
if not defined NPM_CMD (
    for /f "delims=" %%D in ('where docker.exe 2^>nul') do (
        set "DOCKER_CMD=%%D"
        goto :docker_found
    )
    if exist "C:\Program Files\Docker\Docker\resources\bin\docker.exe" set "DOCKER_CMD=C:\Program Files\Docker\Docker\resources\bin\docker.exe"
    if not defined DOCKER_CMD if exist "%LocalAppData%\Docker\wsl\distro\bin\docker.exe" set "DOCKER_CMD=%LocalAppData%\Docker\wsl\distro\bin\docker.exe"
    if not defined DOCKER_CMD (
        echo Node.js/npm nije pronadjen na Windows hostu, a Docker nije dostupan.
        echo Instaliraj Node.js LTS sa https://nodejs.org/ ili pokreni Docker Desktop.
        pause
        exit /b 1
    )
:docker_found
    set "USE_DOCKER_NODE=1"
    echo Node.js nije pronadjen na hostu. Koristicu Docker: %DOCKER_CMD%
)
:npm_found
if defined USE_DOCKER_NODE goto :dependencies
for %%N in ("%NPM_CMD%") do set "NODE_HOME=%%~dpN"
set "PATH=%NODE_HOME%;%PATH%"
echo Node.js/npm pronadjen: %NPM_CMD%
node --version
call "%NPM_CMD%" --version

:dependencies
if not exist "%BACKEND%\mvnw.cmd" (
    echo Backend Maven wrapper nije pronadjen:
    echo %BACKEND%\mvnw.cmd
    pause
    exit /b 1
)

if not exist "%FRONTEND%\package.json" (
    echo React frontend nije pronadjen:
    echo %FRONTEND%\package.json
    pause
    exit /b 1
)

if not exist "%FRONTEND%\node_modules" (
    echo Prva instalacija React dependency-ja...
    if defined USE_DOCKER_NODE (
        "%DOCKER_CMD%" run --rm -v "%FRONTEND%:/app" -w /app node:24-slim npm install
    ) else (
        cd /d "%FRONTEND%"
        call "%NPM_CMD%" install
    )
    if errorlevel 1 (
        echo npm install nije uspio.
        pause
        exit /b 1
    )
)

for /f "delims=" %%M in ('where mvn.cmd 2^>nul') do (
    set "MAVEN_CMD=%%M"
    goto :maven_found
)
if exist "C:\Program Files\JetBrains\IntelliJ IDEA 2025.2.4\plugins\maven\lib\maven3\bin\mvn.cmd" set "MAVEN_CMD=C:\Program Files\JetBrains\IntelliJ IDEA 2025.2.4\plugins\maven\lib\maven3\bin\mvn.cmd"
:maven_found
if defined MAVEN_CMD echo Maven pronadjen: %MAVEN_CMD%
if not defined DOCKER_CMD if exist "C:\Program Files\Docker\Docker\resources\bin\docker.exe" set "DOCKER_CMD=C:\Program Files\Docker\Docker\resources\bin\docker.exe"

echo Pokrecem Spring Boot backend na http://localhost:8080 ...
start "PulseOdds Backend" "%ROOT%run-backend.bat"

echo Pokrecem React frontend na http://localhost:5173 ...
if defined USE_DOCKER_NODE (
    start "PulseOdds Frontend" "%ROOT%run-frontend-docker.bat"
) else (
    start "PulseOdds Frontend" /D "%FRONTEND%" cmd /k npm run dev
)

echo.
echo PulseOdds je pokrenut.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080
echo.
echo Za gasenje aplikacije zatvori prozore Backend i Frontend.
echo Ovaj prozor mozes zatvoriti kada se otvore oba prozora.
pause
exit /b 0
