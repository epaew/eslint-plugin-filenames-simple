import { RuleTester } from 'eslint';
import { rules } from '#/rules';

const ruleTester = new RuleTester();

ruleTester.run('extname', rules.extname, {
  valid: [
    { code: '', filename: 'index.js' },
    { code: '', filename: 'INDEX.JS', options: ['UPPERCASE'] },
    { code: '', filename: 'index.js2', options: ['lowercase-with-number'] },
    { code: '', filename: 'INDEX.JS2', options: ['UPPERCASE_WITH_NUMBER'] },
  ],
  invalid: [
    {
      code: '',
      filename: 'INDEX.JS',
      errors: ['File extension must be lowercase.'],
    },
    {
      code: '',
      filename: 'INDEX.JS2',
      errors: ['File extension must be lowercase.'],
    },
    {
      code: '',
      filename: 'index.js',
      options: ['UPPERCASE'],
      errors: ['File extension must be UPPERCASE.'],
    },
    {
      code: '',
      filename: 'index.js2',
      options: ['UPPERCASE'],
      errors: ['File extension must be UPPERCASE.'],
    },
    {
      code: '',
      filename: 'INDEX.JS',
      options: ['lowercase-with-number'],
      errors: ['File extension must be lowercase-with-number.'],
    },
    {
      code: '',
      filename: 'index.js',
      options: ['UPPERCASE_WITH_NUMBER'],
      errors: ['File extension must be UPPERCASE_WITH_NUMBER.'],
    },
  ],
});
