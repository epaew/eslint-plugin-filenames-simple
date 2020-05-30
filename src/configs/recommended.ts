import { Linter } from 'eslint';
import { all } from './all';

export const recommended = all;

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
