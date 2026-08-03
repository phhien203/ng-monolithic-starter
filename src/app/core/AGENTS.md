# Core guide

`core` contains application-wide infrastructure that is initialized once or shared by every
feature, such as runtime configuration, authentication state, global providers, and observability.

- Core may import only other core code and third-party packages.
- Core must not import layout, feature, common, or project UI code.
- Prefer root-provided `@Service` services or root NgRx signal stores for genuine singletons.
- Keep domain workflows inside their owning feature; broad reuse alone does not make code core.
- Validate external data at the boundary and keep browser-visible runtime configuration free of
  secrets.
- Unit-test initialization, parsing, state transitions, and failure cases without real network
  calls.
