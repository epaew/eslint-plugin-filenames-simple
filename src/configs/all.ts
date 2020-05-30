import { Linter } from 'eslint';

export const all: Linter.BaseConfig = {
  plugins: ['filenames-simple'],
  rules: {
    'filenames-simple/extname': 'error',
    'filenames-simple/naming-convention': 'error',
    'filenames-simple/no-index': 'error',
  },
};
