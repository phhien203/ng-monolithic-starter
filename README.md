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
