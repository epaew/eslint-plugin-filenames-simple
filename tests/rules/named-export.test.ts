import { RuleTester } from 'eslint';
import { namedExport } from '#/rules/named-export';

// TODO
// const ruleTester = new RuleTester();

const ruleTesterES2015 = new RuleTester({
  parserOptions: { ecmaVersion: '2015', sourceType: 'module' },
});

ruleTesterES2015.run('named-export', namedExport, {
  valid: [
    {
      code: 'export const module = 1',
      filename: 'module.js',
    },
    {
      code: 'export const module1 = 1; export const module2 = 2',
      filename: 'module.js',
    },
    {
      code: 'const module = 1; export { module }',
      filename: 'module.js',
    },
    {
      code: 'const module1 = 1; const module2 = 2; export { module1, module2 }',
      filename: 'module.js',
    },
  ],
  invalid: [],
});
