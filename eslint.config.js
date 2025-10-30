import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  js.configs.recommended,
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css']
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    extends: [
      ...tseslint.configs.recommended,
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,

      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 4],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'import/no-unresolved': 'off',

      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'index',
            'sibling'
          ],
          pathGroups: [
            {
              pattern: '*.json',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '*.scss',
              group: 'sibling',
              position: 'after'
            },
            {
              pattern: './*.scss',
              group: 'sibling',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'never'
        }
      ]
    }
  }
);
