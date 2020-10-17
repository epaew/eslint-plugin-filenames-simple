import { parse as esParse } from 'espree';
import { parse as tsParse } from '@typescript-eslint/typescript-estree';
import { ESTreeParser } from '#/utils/estree-parser';
import { Program } from '#/utils/estree-parser/types';

describe('ESTreeParser', () => {
  const parsers = {
    ECMAScript: (code: string) => esParse(code, { ecmaVersion: 2019, sourceType: 'module' }),
    TypeScript: tsParse,
  };
  const getParser = (node: Program) => new ESTreeParser(node);

  for (const key in parsers) {
    describe(`with parse() for ${key}`, () => {
      const parse = parsers[key as keyof typeof parsers];

      describe('getExportAllDeclarationsFromProgram()', () => {
        const subject = (statements: string) => {
          const program = parse(statements) as Program;
          const parser = getParser(program);
          return parser.getExportAllDeclarationsFromProgram().unwrap();
        };

        test('With empty statement', () => {
          const statements = '';
          expect(subject(statements)).toEqual([]);
        });

        test('With single const declaration statement', () => {
          const statements = 'const num = 1';
          expect(subject(statements)).toEqual([]);
        });

        test('With single export statement', () => {
          const statements = "export * from '.'";
          expect(subject(statements)).toEqual(
            expect.arrayContaining([expect.objectContaining({ type: 'ExportAllDeclaration' })]),
          );
        });
      });

      describe('getExportDefaultDeclarationsFromProgram()', () => {
        const subject = (statements: string) => {
          const program = parse(statements) as Program;
          const parser = getParser(program);
          return parser.getExportDefaultDeclarationsFromProgram().unwrap();
        };

        test('With empty statement', () => {
          const statements = '';
          expect(subject(statements)).toEqual([]);
        });

        test('With single const declaration statement', () => {
          const statements = 'const num = 1';
          expect(subject(statements)).toEqual([]);
        });

        test('With single export statement', () => {
          const statements = "export default { key: 'value' }";
          expect(subject(statements)).toEqual(
            expect.arrayContaining([expect.objectContaining({ type: 'ExportDefaultDeclaration' })]),
          );
        });
      });

      describe('getExportNamedDeclarationsFromProgram()', () => {
        const subject = (statements: string) => {
          const program = parse(statements) as Program;
          const parser = getParser(program);
          return parser.getExportNamedDeclarationsFromProgram().unwrap();
        };

        test('With empty statement', () => {
          const statements = '';
          expect(subject(statements)).toEqual([]);
        });

        test('With single const declaration statement', () => {
          const statements = 'const num = 1';
          expect(subject(statements)).toEqual([]);
        });

        test('With single export statement', () => {
          const statements = 'export const num = 1';
          expect(subject(statements)).toEqual(
            expect.arrayContaining([expect.objectContaining({ type: 'ExportNamedDeclaration' })]),
          );
        });
      });

      describe('getIdentifiersFromExportNamedDeclaration()', () => {
        const subject = (statements: string) => {
          const program = parse(statements) as Program;
          const parser = getParser(program);
          return parser
            .getExportNamedDeclarationsFromProgram()
            .getIdentifiersFromExportNamedDeclaration()
            .unwrap();
        };

        test('With empty statement', () => {
          const statements = '';
          expect(subject(statements)).toEqual([]);
        });

        test('With single const declaration statement', () => {
          const statements = 'const num = 1';
          expect(subject(statements)).toEqual([]);
        });

        test('With single export statement: const Literal', () => {
          const statements = `
        export const num = 'string'
        const str = 'string'
        export { str }
      `;
          expect(subject(statements)).toEqual([
            expect.objectContaining({ type: 'Identifier', name: 'num' }),
            expect.objectContaining({ type: 'Identifier', name: 'str' }),
          ]);
        });

        test('With single export statement: const Array', () => {
          const statements = `
        export const array = [1, 2, 3]
        export const [element, assignment = 1, ...rest] = array
      `;
          expect(subject(statements)).toEqual([
            expect.objectContaining({ type: 'Identifier', name: 'array' }),
            expect.objectContaining({ type: 'Identifier', name: 'element' }),
            expect.objectContaining({ type: 'Identifier', name: 'assignment' }),
            expect.objectContaining({ type: 'Identifier', name: 'rest' }),
          ]);
        });

        test('With single export statement: const Object', () => {
          const statements = `
            export const object = {
              key: 'value',
              nested: {
                key: 'value',
              }
            }

            export const { key, assignment = 'assign', ...rest } = object
            export const { key: alias } = object
            export const { nested: { key: nestedAlias } } = object
          `;
          expect(subject(statements)).toEqual([
            expect.objectContaining({ type: 'Identifier', name: 'object' }),
            expect.objectContaining({ type: 'Identifier', name: 'key' }),
            expect.objectContaining({ type: 'Identifier', name: 'assignment' }),
            expect.objectContaining({ type: 'Identifier', name: 'rest' }),
            expect.objectContaining({ type: 'Identifier', name: 'alias' }),
            expect.objectContaining({ type: 'Identifier', name: 'nestedAlias' }),
          ]);
        });

        test('With single export statement: class/function', () => {
          const statements = `
            export class c1 {}
            export class c2 extends c1 {}
            export function f1() { return true }
          `;
          expect(subject(statements)).toEqual([
            expect.objectContaining({ type: 'Identifier', name: 'c1' }),
            expect.objectContaining({ type: 'Identifier', name: 'c2' }),
            expect.objectContaining({ type: 'Identifier', name: 'f1' }),
          ]);
        });
      });
    });
  }

  describe('TypeScript extended notations', () => {
    const parse = parsers.TypeScript;

    describe('getIdentifiersFromExportNamedDeclaration()', () => {
      const subject = (statements: string) => {
        const program = parse(statements) as Program;
        const parser = getParser(program);
        return parser
          .getExportNamedDeclarationsFromProgram()
          .getIdentifiersFromExportNamedDeclaration()
          .unwrap();
      };

      test('With single export statement: declare/enum/interface/type', () => {
        const statements = `
          export enum e {
            E1,
          }
          export function f1(): boolean { return true }
          export declare function f2(arg: any): boolean
          export interface i {
            i: number
          }
          export declare module m {}
          export type t = {
            s: string
          }
        `;

        expect(subject(statements)).toEqual([
          expect.objectContaining({ type: 'Identifier', name: 'e' }),
          expect.objectContaining({ type: 'Identifier', name: 'f1' }),
          expect.objectContaining({ type: 'Identifier', name: 'f2' }),
          expect.objectContaining({ type: 'Identifier', name: 'i' }),
          expect.objectContaining({ type: 'Identifier', name: 'm' }),
          expect.objectContaining({ type: 'Identifier', name: 't' }),
        ]);
      });
    });
  });
});
