import path from 'path';

import { TSESLint } from '@typescript-eslint/utils';

import { typescriptModuleDeclaration } from '#/rules/typescript-module-declaration';

describe('rules/typescript-module-declaration', () => {
  const ruleTester = new TSESLint.RuleTester({
    parser: path.resolve(__dirname, '../../node_modules/@typescript-eslint/parser'),
    parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
  });

  ruleTester.run('module declaration with string (without path separator)', typescriptModuleDeclaration, {
    valid: [
      {
        code: `
            declare module 'espree' {
              export function parse(code: string, options?: any): Node;
            }
          `,
        filename: 'espree.d.ts',
      },
      // https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
      {
        code: `
            declare module "url" {
              export interface Url {
                protocol?: string;
                hostname?: string;
                pathname?: string;
              }

              export function parse(
                urlStr: string,
                parseQueryString?,
                slashesDenoteHost?
              ): Url;
            }

            declare module "path" {
              export function normalize(p: string): string;
              export function join(...paths: any[]): string;
              export var sep: string;
            }
          `,
        filename: 'node.d.ts',
      },
    ],
    invalid: [
      {
        code: `
            declare module 'espree' {
              export function parse(code: string, options?: any): Node;
            }
          `,
        filename: 'estree.d.ts',
        errors: [
          {
            messageId: 'invalidFilename',
            data: { filename: 'espree.d.ts' },
          },
        ],
      },
    ],
  });

  ruleTester.run('module declaration with string (with path separator)', typescriptModuleDeclaration, {
    valid: [
      {
        code: `
            declare module 'dayjs/locale/*' {
              namespace locale {
                interface Locale extends ILocale {};
              }

              const locale: locale.Locale;

              export default locale;
            }
          `,
        filename: 'dayjs.d.ts',
      },
      {
        code: "declare module 'dayjs/locale/*' {}",
        filename: 'dayjs-locale.d.ts',
      },
      {
        code: "declare module 'dayjs/locale/*' {}",
        filename: 'dayjs/locale.d.ts',
      },
      {
        code: "declare module 'dayjs/locale/*' {}",
        filename: 'dayjs/locale/index.d.ts',
      },
    ],
    invalid: [
      {
        code: "declare module 'dayjs/locale/*' {}",
        filename: 'locale.d.ts',
        errors: [
          {
            messageId: 'invalidFilename',
            data: { filename: 'dayjs.d.ts' },
          },
        ],
      },
    ],
  });

  ruleTester.run('module declaration with string (with exclamation and wildcard)', typescriptModuleDeclaration, {
    valid: [
      // https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
      {
        code: `
            declare module "json!*" {
              const value: any;
              export default value;
            }
          `,
        filename: 'json.d.ts',
      },
      {
        code: `
            declare module "*!text" {
              const content: string;
              export default content;
            }
          `,
        filename: 'text.d.ts',
      },
    ],
    invalid: [],
  });

  ruleTester.run('module declaration with variable', typescriptModuleDeclaration, {
    valid: [
      {
        code: "import Dayjs from 'dayjs'; declare module Dayjs {}",
        filename: 'dayjs.d.ts',
      },
    ],
    invalid: [],
  });
});
