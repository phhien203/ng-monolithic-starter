import boundaries from 'eslint-plugin-boundaries';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.ts'],
  ignores: [],
  plugins: { boundaries },
  extends: [boundaries.configs.strict],
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        message:
          'Module boundary violation: "{{ from.type }}" cannot import {{#if to.type}}"{{ to.type }}"{{else}}an unclassified local module{{/if}}. Review the allowed dependency directions in boundaries.config.js.',
        checkUnknownLocals: true,
        policies: [
          {
            from: { element: { type: 'main' } },
            allow: { to: { element: { type: 'app' } } },
          },
          {
            from: { element: { type: 'core' } },
            allow: { to: { element: { type: 'core' } } },
          },
          {
            from: { element: { type: 'ui' } },
            allow: { to: { element: { type: 'ui' } } },
          },
          {
            from: { element: { type: 'layout' } },
            allow: {
              to: { element: { types: { anyOf: ['common', 'core', 'layout', 'ui'] } } },
            },
          },
          {
            from: { element: { type: 'app' } },
            allow: {
              to: { element: { types: { anyOf: ['app', 'core', 'feature', 'layout'] } } },
            },
          },
          {
            from: { element: { type: 'common' } },
            allow: {
              to: { element: { types: { anyOf: ['common', 'core', 'ui'] } } },
            },
          },
          {
            from: { element: { type: 'feature' } },
            disallow: {
              to: {
                element: {
                  type: 'feature',
                  captured: { feature: '!{{ from.element.captured.feature }}' },
                },
              },
            },
            message:
              'Cross-feature import is not allowed: "{{ from.element.captured.feature }}" cannot import from "{{ to.element.captured.feature }}". Move shared code to common.',
          },
          {
            from: { element: { type: 'feature' } },
            allow: {
              to: [
                { element: { types: { anyOf: ['common', 'core', 'ui'] } } },
                {
                  element: {
                    type: 'feature',
                    captured: { feature: '{{ from.element.captured.feature }}' },
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'boundaries/ignore': [],
    'boundaries/dependency-nodes': ['import', 'dynamic-import'],
    'boundaries/elements': [
      {
        type: 'core',
        pattern: 'src/app/core',
        partialMatch: false,
      },
      {
        type: 'ui',
        pattern: 'src/app/shared/ui',
        partialMatch: false,
      },
      {
        type: 'layout',
        pattern: 'src/app/layout',
        partialMatch: false,
      },
      {
        type: 'common',
        pattern: 'src/app/common',
        partialMatch: false,
      },
      {
        type: 'feature',
        pattern: 'src/app/modules/*',
        capture: ['feature'],
        partialMatch: false,
      },
      {
        type: 'app',
        pattern: 'src/app',
        partialMatch: false,
      },
      {
        type: 'main',
        pattern: 'src',
        partialMatch: false,
      },
    ],
  },
});
