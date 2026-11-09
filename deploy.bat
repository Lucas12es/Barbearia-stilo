@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"

rem ============================================================
rem  DEPLOY - Barbearia Stilo
rem  Envia as alteracoes para o GitHub. O Cloudflare Pages,
rem  conectado ao repositorio, publica o site automaticamente.
rem  Repositorio: Lucas12es/Barbearia-stilo.
rem ============================================================

set "REPO_URL=https://github.com/Lucas12es/Barbearia-stilo.git"
set "BRANCH=main"

where git >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Git nao encontrado. Instale em https://git-scm.com/download/win e tente de novo.
  goto :fim
)

if not exist ".git" (
  echo [1/4] Conectando esta pasta ao repositorio do GitHub...
  git init -b %BRANCH% || goto :erro
  git remote add origin %REPO_URL% || goto :erro
  git fetch origin
  git rev-parse --verify origin/%BRANCH% >nul 2>&1
  if not errorlevel 1 git reset --mixed origin/%BRANCH%
) else (
  echo [1/4] Repositorio ja conectado.
  git remote get-url origin >nul 2>&1 || git remote add origin %REPO_URL%
)

set "MSG=%~1"
if "%MSG%"=="" set /p MSG="Mensagem do commit (Enter = Atualizacao do site): "
if "%MSG%"=="" set "MSG=Atualizacao do site"

echo [2/4] Preparando arquivos...
git add -A || goto :erro
git diff --cached --quiet
if not errorlevel 1 (
  echo Nenhuma alteracao nova para enviar.
  goto :sync
)
echo [3/4] Criando commit: %MSG%
git commit -m "%MSG%" || goto :erro

:sync
echo [4/4] Enviando para o GitHub...
git ls-remote --exit-code --heads origin %BRANCH% >nul 2>&1
if not errorlevel 1 (
  git pull --rebase -X theirs origin %BRANCH%
  if errorlevel 1 (
    git rebase --abort
    goto :erro
  )
)
git push -u origin %BRANCH% || goto :erro

echo.
echo ============================================================
echo  Pronto! Codigo enviado ao GitHub.
echo  O Cloudflare Pages vai publicar em ate 1-2 minutos.
echo ============================================================
goto :fim

:erro
echo.
echo [ERRO] Algo deu errado. Leia a mensagem acima.

:fim
echo.
pause
endlocal
