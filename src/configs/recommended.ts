import { Linter } from 'eslint';

export const recommended: Linter.BaseConfig = {
  plugins: ['filenames-simple'],
  rules: {
    'filenames-simple/extension': 'error',
    'filenames-simple/named-export': ['warn', 'singular'],
    'filenames-simple/naming-convention': 'error',
    'filenames-simple/no-index': 'off',
    'filenames-simple/pluralize': 'off',
    'filenames-simple/typescript-module-declaration': 'error',
  },
};

export const recommendedReact: Linter.BaseConfig = {
  ...recommended,
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        'filenames-simple/naming-convention': ['error', { rule: 'PascalCase' }],
      },
    },
  ],
};

export const recommendedVue: Linter.BaseConfig = {
  ...recommended,
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'filenames-simple/naming-convention': ['error', { rule: 'PascalCase' }],
      },
    },
  ],
};
