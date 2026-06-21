import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['build/**', 'coverage/**', 'dist/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['server.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'react-x': {
        version: 'detect',
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  prettierRecommended
);
