import eslint from '@eslint/js';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import boundariesConfig from './boundaries.config.js';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      boundariesConfig,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
  {
    files: ['src/app/shared/ui/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'hlm',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'hlm',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-input-rename': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  {
    files: ['src/app/shared/ui/**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
  {
    files: [
      'src/app/shared/ui/carousel/src/lib/hlm-carousel-next.ts',
      'src/app/shared/ui/carousel/src/lib/hlm-carousel-previous.ts',
    ],
    rules: {
      '@angular-eslint/component-selector': 'off',
    },
  },
]);
