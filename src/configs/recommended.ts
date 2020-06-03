import { Linter } from 'eslint';

export const recommended: Linter.BaseConfig = {
  plugins: ['filenames-simple'],
  rules: {
    'filenames-simple/extname': 'error',
    'filenames-simple/named-export': 'warn',
    'filenames-simple/naming-convention': 'error',
    'filenames-simple/no-index': 'off',
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
