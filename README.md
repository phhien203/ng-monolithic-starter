# NgMonolithicStarter

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running with Docker

Build the production image:

```bash
docker build -t ng-monolithic-starter .
```

Run the Angular app with nginx, inject its runtime configuration, and open `http://localhost:8080`:

```bash
docker run --rm -p 8080:80 \
  -e API_BASE_URL=https://api.example.com \
  -e SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0 \
  ng-monolithic-starter
```

At container startup, the image generates `/usr/share/nginx/html/config.json` from `API_BASE_URL` and `SENTRY_DSN`. If omitted, they default to `/api` and an empty string, matching `public/config.json` used by the local development server. These values are public browser configuration and must not contain credentials or other secrets.

You can also load the values from an environment file:

```bash
docker run --rm -p 8080:80 --env-file .env.production ng-monolithic-starter
```

The nginx configuration supports Angular client-side routing, so directly opening a nested route falls back to `index.html`.

### Runtime configuration in GitHub Actions

Do not commit or build a real `.env` file into the image. The Docker image is environment-independent; `API_BASE_URL` and `SENTRY_DSN` are injected when the container starts and nginx uses them to generate `config.json`.

Create a GitHub deployment environment such as `production` under **Settings → Environments**, then add these environment variables:

```text
API_BASE_URL=https://api.example.com
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

These values are exposed in the browser through `config.json`, so they must not contain credentials or other secrets. Keep private deployment credentials in GitHub Actions secrets instead.

A deployment job can pass the GitHub environment variables directly to Docker:

```yaml
deploy:
  runs-on: self-hosted
  environment: production
  env:
    API_BASE_URL: ${{ vars.API_BASE_URL }}
    SENTRY_DSN: ${{ vars.SENTRY_DSN }}
    IMAGE: ghcr.io/${{ github.repository }}:${{ github.sha }}
  steps:
    - name: Run application
      run: |
        docker pull "$IMAGE"
        docker run --detach \
          --name ng-monolithic-starter \
          --publish 8080:80 \
          --env API_BASE_URL \
          --env SENTRY_DSN \
          "$IMAGE"
```

With Docker Compose, declare the variables without values so Compose forwards them from the workflow environment:

```yaml
services:
  app:
    image: ${IMAGE}
    ports:
      - '8080:80'
    environment:
      API_BASE_URL:
      SENTRY_DSN:
```

The committed `.env.example` documents the supported variables for local development. Actual values should come from GitHub environment variables, GitHub secrets where appropriate, or the deployment platform.

## Analyzing the bundle

To create a production build and open an interactive bundle-size report, run:

```bash
pnpm analyze
```

The generated report is stored at `dist/ng-monolithic-starter/bundle-analysis.html`.

## Analyzing source dependencies

To render the full visual source dependency graph, run:

```bash
pnpm deps:graph
```

`deps:graph` is an alias for `deps:graph:all`. Use the scoped commands to generate smaller graphs that include the selected scope and its immediate dependencies:

```bash
pnpm deps:graph:all
pnpm deps:graph:modules
pnpm deps:graph:core
pnpm deps:graph:layout
pnpm deps:graph:shared
```

The scoped commands generate matching `dependency-graph-<scope>.svg` files in `dist/`. The copied UI components are collapsed into one node per component.

SVG rendering requires the Graphviz `dot` command. TypeScript resolution and graph scope are configured in `.dependency-cruiser.cjs`.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
