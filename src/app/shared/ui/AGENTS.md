# Shared UI guide

This directory contains project-owned spartan/ui Helm source copied by `@spartan-ng/cli`. It is the
styled layer over the installed `@spartan-ng/brain` accessibility primitives.

- Modify this directory only for intentional, reusable design-system behavior. Feature-specific
  composition belongs in the feature.
- Inspect context with `pnpm ng generate @spartan-ng/cli:info --json` before adding components. Do
  not re-add installed components.
- Add components with `pnpm ng generate @spartan-ng/cli:ui --name=<component>` and confirm APIs via
  the spartan MCP server.
- Prefer built-in variants and semantic tokens such as `primary`, `muted`, and `destructive`; never
  hard-code palette colors.
- Use `gap-*` for sibling spacing, `size-*` for equal dimensions, and `hlm()` or `classes()` when
  merging class values.
- Preserve full component composition: overlay titles, card structure, grouped items, avatar
  fallbacks, and the appropriate feedback components.
- Register every `ng-icon` through `provideIcons` and use the icon component's `size` input.
- Do not fork or edit installed Brain package sources.
- Run `pnpm ng generate @spartan-ng/cli:healthcheck` and `pnpm verify` after changes.
