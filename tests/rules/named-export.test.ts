import { RuleTester } from 'eslint';
import { namedExport } from '#/rules/named-export';

const ruleTesterES2015 = new RuleTester({
  parserOptions: { ecmaVersion: '2015', sourceType: 'module' },
});

ruleTesterES2015.run('named-export: default export', namedExport, {
  valid: [
    {
      code: 'const module = 1; export default module',
      filename: 'module.js',
    },
    {
      code: 'const module = 1; export default module',
      filename: 'mod.js',
    },
  ],
  invalid: [],
});

ruleTesterES2015.run('named-export: multiple named export', namedExport, {
  valid: [
    {
      code: 'export const module1 = 1; export const module2 = 2',
      filename: 'module.js',
    },
    {
      code: 'const module1 = 1, module2 = 2; export { module1, module2 }',
      filename: 'module.js',
    },
  ],
  invalid: [],
});

ruleTesterES2015.run('named-export: single named export', namedExport, {
  valid: [
    {
      code: 'const module = 1; export { module }',
      filename: 'module.js',
    },
    {
      code: 'const mod = 1; export { mod as module }',
      filename: 'module.js',
    },
    {
      code: 'export const module = 1',
      filename: 'module.js',
    },
    {
      code: 'export function myFunction() { return 1; }',
      filename: 'MyFunction.js',
    },
    {
      code: 'export class MySuperClass {}',
      filename: 'my-super-class.js',
    },
  ],
  invalid: [
    {
      code: 'const module = 1; export { module }',
      filename: 'mod.js',
      errors: ['The export name must match the filename. You need to rename to Mod or mod.'],
    },
    {
      code: 'const module = 1; export { module as mod }',
      filename: 'my-module.js',
      errors: [
        'The export name must match the filename. You need to rename to MyModule or myModule.',
      ],
    },
  ],
});
