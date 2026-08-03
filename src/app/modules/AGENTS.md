# Feature module guide

Each direct child of this directory is an independently owned feature boundary.

- Keep routes in `<feature>.routes.ts` and lazy-load feature screens with `loadComponent`.
- Organize feature-only code under the feature: `api` for transport adapters, `components` for
  subordinate UI, and `models` for feature contracts. Add directories only when they contain real
  code.
- Provide feature-scoped API services at the route or page boundary unless they are true
  application-wide singletons.
- Never import another feature. Move shared, domain-neutral code to `src/app/common`; do not use
  `core` as an escape hatch.
- Pages compose `@spartan-ng/helm/*` components. Do not modify `src/app/shared/ui` for a one-off
  feature requirement.
- Colocate `*.spec.ts` files with the behavior they cover. Use `RouterTestingHarness` for routes and
  replace API boundaries with deterministic fakes in component tests.
- Model loading, success, empty, and error states explicitly for data-driven screens.

The products feature is the reference example for lazy routing, explicit view states, accessible
spartan/ui composition, and component/router tests.
