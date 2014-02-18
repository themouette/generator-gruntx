SET environment="dev"
SET compress="false"

REM Read options
:loop
@IF NOT "%1"=="" (
    echo %1
    echo %2
    @IF "%1"=="-e" (
        SET environment=%2
        SHIFT
    )
    @IF "%1"=="--env" (
        SET environment=%2
        SHIFT
    )
    @IF "%1"=="-c" (
        SET compress=%2
        SHIFT
    )
    @IF "%1"=="--compress" (
        SET compress=%2
        SHIFT
    )
    @IF "%1"=="--node" (
        REM nothing to do
        SHIFT
    )
    SHIFT
    GOTO :loop
)

REM Environment: %environment%
REM Compress: %compress%

@IF EXIST "%~dp0\npm.exe" (
  call "%~dp0\npm.exe"  "install"
) ELSE (
  REM use npm and not exe
  call npm "install"
)

REM Path: %~dp0%

call "%~dp0\..\node_modules\.bin\bower" "install"

REM Build assets

@IF "%environment%" == "dev" (
    echo Grunt with development mode.
    call "%~dp0..\node_modules\.bin\grunt.cmd" "build:dev"
) ELSE (
    echo Grunt with release mode.
    @IF "%compress%" == "true" (
        call "%~dp0..\node_modules\.bin\grunt.cmd" "release"
    ) ELSE (
        call "%~dp0..\node_modules\.bin\grunt.cmd" "release:nocompress"
    )
)
