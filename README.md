# Komite - Red de participantes

SPA en Vite + React 19 + TypeScript + shadcn/ui + Tailwind. Sin backend: los datos son locales.

## Desarrollo

    pnpm install
    pnpm dev      # http://localhost:8080
    pnpm build

## Flujo de despliegue

Lovable -> repo GitHub (`main`) -> GitHub Action `sync-azure-devops.yml` -> repo Azure DevOps -> pipeline CI/CD -> App Service.

Configuración requerida en GitHub:
- Secreto `AZURE_DEVOPS_PAT`: token con permiso de escritura en Code.
- Variable `AZURE_DEVOPS_REPO_URL`: `dev.azure.com/<org>/<proyecto>/_git/<repo>`.

`public/web.config` aporta el fallback de SPA para App Service sobre Windows/IIS.
En App Service Linux use el comando de inicio `pm2 serve /home/site/wwwroot --no-daemon --spa`.
