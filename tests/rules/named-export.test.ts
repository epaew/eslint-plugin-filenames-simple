import path from 'path';

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

ruleTesterES2015.run('named-export: single named export with default/all export', namedExport, {
  valid: [
    {
      code: "export const extraModule = 1; export default { key: 'value' }",
      filename: 'module.js',
    },
    {
      code: "export const extraModule = 1; export * from '.'",
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
      code: 'export const rules = {}',
      filename: 'src/rules/index.js',
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
    {
      code: 'export const rule = {}',
      filename: 'src/rules/index.js',
      errors: ['The export name must match the filename. You need to rename to Rules or rules.'],
    },
  ],
});

const ruleTesterTS2015 = new RuleTester({
  parser: path.resolve(__dirname, '../../node_modules/@typescript-eslint/parser'),
  parserOptions: { ecmaVersion: '2015', sourceType: 'module' },
});

ruleTesterTS2015.run('named-export(ts): default export', namedExport, {
  valid: [
    {
      code: 'const module: number = 1; export default module;',
      filename: 'module.ts',
    },
  ],
  invalid: [],
});

ruleTesterTS2015.run('named-export(ts): multiple named export', namedExport, {
  valid: [
    {
      code: "export const module1: number = 1; export const module2: string = 'string'",
      filename: 'module.ts',
    },
    {
      code: `const module1: any[] = [];
const module2: { key: string } = { key: 'string' };
export { module1, module2 }`,
      filename: 'module.ts',
    },
  ],
  invalid: [],
});

ruleTesterTS2015.run('named-export(ts): single named export', namedExport, {
  valid: [
    {
      code: 'export type Empty = {}',
      filename: 'empty.ts',
    },
  ],
  invalid: [
    {
      code: 'export type Blank = {}',
      filename: 'empty.ts',
      errors: ['The export name must match the filename. You need to rename to Empty or empty.'],
    },
  ],
});
