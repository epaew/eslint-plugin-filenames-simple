import path from 'path';

import { RuleTester } from 'eslint';
import { namedExport } from '#/rules/named-export';

describe('rules/named-export', () => {
  const sharedTests = (ruleTester: RuleTester) => {
    ruleTester.run('all export', namedExport, {
      valid: [
        {
          code: 'export * from "some-module"',
          filename: 'module.js',
        },
      ],
      invalid: [],
    });

    ruleTester.run('default export', namedExport, {
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

    ruleTester.run('multiple named export', namedExport, {
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

    ruleTester.run('single named export with default/all export', namedExport, {
      valid: [
        {
          code: "export const extraModule = 1; export * from 'some-module'",
          filename: 'module.js',
        },
        {
          code: "export const extraModule = 1; export default { key: 'value' };",
          filename: 'module.js',
        },
      ],
      invalid: [],
    });

    ruleTester.run('single named export', namedExport, {
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
          code: 'const [module] = [1]; export { module }',
          filename: 'module.js',
        },
        {
          code: 'const [...module] = [1]; export { module }',
          filename: 'module.js',
        },
        {
          code: 'const { module } = { module: 1 }; export { module }',
          filename: 'module.js',
        },
        {
          code: 'export const rules = {}',
          filename: 'src/rules/index.js',
        },
        {
          code: 'export function myFunction(params) { return params; }',
          filename: 'my_function.js',
        },
        {
          code: 'export const myFunction = function(params) { return params; }',
          filename: 'MyFunction.js',
        },
        {
          code: 'export const myFunction = function myFunction(params) { return params; }',
          filename: 'MyFunction.js',
        },
        {
          code: 'export const mySpecialFunction = params => { return params; }',
          filename: 'MySpecialFunction.js',
        },
        {
          code: 'export class MyClass {}',
          filename: 'my-class.js',
        },
        {
          code: 'export const MySpecialClass = class {}',
          filename: 'my-special-class.js',
        },
        {
          code: 'export const MySpecialClass = class MyClass extends MyBaseClass {}',
          filename: 'my-special-class.js',
        },
        // https://github.com/epaew/eslint-plugin-filenames-simple/issues/156
        {
          code: 'export class ESTreeParser {}',
          filename: 'estree-parser.js',
        },
        {
          code: "export { linter } from './linter'",
          filename: 'linter/index.js',
        },
        {
          code: 'const module = 1; export { module }',
          filename: 'module.js',
          options: ['always'],
        },
        {
          code: 'const module = 1; export { module }',
          filename: 'modules.js',
          options: ['singular'],
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
          errors: [
            'The export name must match the filename. You need to rename to Rules or rules.',
          ],
        },
        {
          code: 'export function myFunction(params) { return params; }',
          filename: 'function.js',
          errors: [
            'The export name must match the filename. You need to rename to Function or function.',
          ],
        },
        {
          code: 'export const myFunction = function(params) { return params; }',
          filename: 'function.js',
          errors: [
            'The export name must match the filename. You need to rename to Function or function.',
          ],
        },
        {
          code: 'export const myFunction = function myFunction(params) { return params; }',
          filename: 'function.js',
          errors: [
            'The export name must match the filename. You need to rename to Function or function.',
          ],
        },
        {
          code: 'export const mySpecialFunction = params => { return params; }',
          filename: 'function.js',
          errors: [
            'The export name must match the filename. You need to rename to Function or function.',
          ],
        },
        {
          code: 'export class MyClass {}',
          filename: 'klass.js',
          errors: [
            'The export name must match the filename. You need to rename to Klass or klass.',
          ],
        },
        {
          code: 'export const MySpecialClass = class {}',
          filename: 'klass.js',
          errors: [
            'The export name must match the filename. You need to rename to Klass or klass.',
          ],
        },
        {
          code: 'export const MySpecialClass = class MyClass extends MyBaseClass {}',
          filename: 'klass.js',
          errors: [
            'The export name must match the filename. You need to rename to Klass or klass.',
          ],
        },
        {
          code: "export { linter } from './linter'",
          filename: 'linters/index.js',
          errors: [
            'The export name must match the filename. You need to rename to Linters or linters.',
          ],
        },
      ],
    });
  };

  describe('with eslint default parser (Espree)', () => {
    describe('with ecmaVersion 2015', () => {
      const ruleTester = new RuleTester({
        parserOptions: { ecmaVersion: '2015', sourceType: 'module' },
      });

      sharedTests(ruleTester);
    });

    describe('with ecmaVersion 2018', () => {
      const ruleTester = new RuleTester({
        parserOptions: { ecmaVersion: '2018', sourceType: 'module' },
      });

      ruleTester.run('single named export', namedExport, {
        valid: [
          {
            code: 'const { module, ...rest } = { module: 1 }; export { rest }',
            filename: 'rest.js',
          },
        ],
        invalid: [
          {
            code: 'const { module, ...rest } = { module: 1 }; export { rest }',
            filename: 'module.js',
            errors: [
              'The export name must match the filename. You need to rename to Module or module.',
            ],
          },
        ],
      });
    });
  });

  describe('with @typescript-eslint/parser', () => {
    describe('with ecmaVersion 2015', () => {
      const ruleTester = new RuleTester({
        parser: path.resolve(__dirname, '../../node_modules/@typescript-eslint/parser'),
        parserOptions: { ecmaVersion: '2015', sourceType: 'module' },
      });

      sharedTests(ruleTester);

      ruleTester.run('default export', namedExport, {
        valid: [
          {
            code: 'const module: number = 1; export default module',
            filename: 'mod.ts',
          },
        ],
        invalid: [],
      });

      ruleTester.run('multiple named export', namedExport, {
        valid: [
          {
            code: `
            export type Type = { n: number };
            export interface Interface { s: string }
          `,
            filename: 'module.ts',
          },
          {
            code: `
            const module1: any[] = [];
            const module2: { key: string } = { key: 'string' };
            export { module1, module2 }
          `,
            filename: 'module.ts',
          },
        ],
        invalid: [],
      });

      ruleTester.run('single named export with default/all export', namedExport, {
        valid: [
          {
            code: "export const extraModule: number = 1; export * from 'some-module'",
            filename: 'module.ts',
          },
          {
            code: "export const extraModule: number = 1; export default { key: 'value' };",
            filename: 'module.ts',
          },
        ],
        invalid: [],
      });

      ruleTester.run('single named export', namedExport, {
        // See https://github.com/typescript-eslint/typescript-eslint/blob/50a46c60fb81d8434aa4268a13d17d8fcf499e21/packages/types/src/ts-estree.ts#L347
        valid: [
          {
            code: 'export enum Role { Admin, Operator }',
            filename: 'role.ts',
          },
          {
            code: 'export interface User { name: string; }',
            filename: 'user.ts',
          },
          {
            code: "export module Module { const val: string = 'module.val'; }",
            filename: 'module.ts',
          },
          {
            code: 'export type Empty = {}',
            filename: 'empty.ts',
          },
        ],
        invalid: [
          {
            code: 'export enum Role { Admin, Operator }',
            filename: 'user-role.ts',
            errors: [
              'The export name must match the filename. You need to rename to UserRole or userRole.',
            ],
          },
          {
            code: 'export interface Person { name: string; }',
            filename: 'user.ts',
            errors: [
              'The export name must match the filename. You need to rename to User or user.',
            ],
          },
          {
            code: "export module Module { const val: string = 'module.val'; }",
            filename: 'mod.ts',
            errors: ['The export name must match the filename. You need to rename to Mod or mod.'],
          },
          {
            code: 'export type Blank = {}',
            filename: 'empty.ts',
            errors: [
              'The export name must match the filename. You need to rename to Empty or empty.',
            ],
          },
        ],
      });

      ruleTester.run('single named export in module declaration', namedExport, {
        valid: [
          {
            code: `
              declare module 'espree' {
                export function parse(code: string, options?: any): Node;
              }
            `,
            filename: 'espree.d.ts',
          },
        ],
        invalid: [],
      });
    });
  });
});
