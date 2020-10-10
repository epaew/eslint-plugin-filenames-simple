import { RuleTester } from 'eslint';
import { noIndex } from '#/rules/no-index';

const ruleTester = new RuleTester();

ruleTester.run('no-index', noIndex, {
  valid: [
    { code: '', filename: 'no-index.js' },
    { code: '', filename: 'index.d.ts' },
  ],
  invalid: [
    {
      code: '',
      filename: 'index.js',
      errors: ['Filename index.js is not allowed.'],
    },
    {
      code: '',
      filename: 'index.ts',
      errors: ['Filename index.ts is not allowed.'],
    },
    {
      code: '',
      filename: 'INDEX.JS',
      errors: ['Filename INDEX.JS is not allowed.'],
    },
  ],
});
