# Layout guide

`layout` owns the application shell, global navigation, and route outlets.

- Layout may depend on layout, common, core, and shared UI code, but never on a feature.
- Navigation metadata may contain URLs and display labels; it must not import feature components or
  feature services.
- Compose existing spartan/ui components and preserve keyboard navigation, focus behavior, and
  accessible landmark labels.
- Keep business state and feature-specific actions out of the shell.
- Add focused component tests when changing navigation behavior or responsive interactions.
