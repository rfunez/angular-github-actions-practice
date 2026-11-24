# Angular - GitHub Actions Practice

Aplicación Angular sencilla para practicar CI/CD con GitHub Actions.

## Stack

- Node.js 22
- Angular 19
- npm
- Jasmine / Karma
- Docker (Nginx)

## Ejecutar localmente

Requisitos: Node.js 22 y npm.

```bash
npm ci
npm start
```

Abre http://localhost:4200.

## Build

```bash
npm run build
```

El build de producción se genera en `dist/angular-github-actions-practice/browser`.

## Tests

```bash
npm test
```

Karma ejecuta los tests en Chrome Headless. Para ejecutarlo localmente, puede ser necesario tener Chrome/Chromium instalado y configurar el entorno.

## Docker

Genera primero el build:

```bash
npm ci
npm run build
```

Construye la imagen:

```bash
docker build -t angular-github-actions-practice:0.0.1 .
```

Ejecuta:

```bash
docker run --rm -p 8080:80 angular-github-actions-practice:0.0.1
```

Abre http://localhost:8080.

## Workflow inicial

`.github/workflows/ci.yml` se ejecuta al hacer push a `main` o al abrir/actualizar Pull Requests hacia `main`.

Pasos:
1. Checkout del repositorio.
2. Configuración de Node.js 22 y cache npm.
3. Instalación reproducible con `npm ci`.
4. Build de producción.
5. Tests.

Lo ampliaremos progresivamente: lint, artifacts, matrices, reusable workflows, Docker, GHCR y despliegue.
