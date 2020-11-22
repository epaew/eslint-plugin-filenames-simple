import 'core-js/features/array/flat-map';

import path from 'path';

import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Rule } from 'eslint';
import { ExportNamedDeclaration, Identifier } from 'estree';

import { Pluralize } from '../utils/pluralize';
import { presetRules } from '../utils/preset-rules';

type PluralizeRule = 'always' | 'singular' | 'plural';

class AloneExportNamedIdentifierDetector {
  #context: Pick<Rule.RuleContext, 'getDeclaredVariables'>;
  #exportedIdentifiers = new Set<Identifier>();
  #isExportAllDetected = false;
  #isExportDefaultDetected = false;

  constructor(context: Pick<Rule.RuleContext, 'getDeclaredVariables'>) {
    this.#context = context;
  }

  get aloneExportNamedIdentifier(): Identifier | void {
    if (this.#isExportAllDetected || this.#isExportDefaultDetected) return;
    if (this.#exportedIdentifiers.size !== 1) return;

    return [...this.#exportedIdentifiers][0];
  }

  detectExportNamedDeclaration(node: ExportNamedDeclaration): void {
    if ((node as TSESTree.ExportNamedDeclaration).parent?.type === 'TSModuleBlock') return;

    if (node.declaration) {
      /*
       * NOTE: https://eslint.org/docs/developer-guide/working-with-rules#the-context-object
       *   > If the node is a FunctionDeclaration or FunctionExpression,
       *   > the variable for the function name is returned,
       *   > in addition to variables for the function parameters.
       */
      this.#context
        .getDeclaredVariables(node.declaration)
        .flatMap(variable => variable.defs)
        .filter(definition => definition.type !== 'Parameter')
        .forEach(definition => this.#exportedIdentifiers.add(definition.name));
    } else {
      node.specifiers.forEach(specifier => this.#exportedIdentifiers.add(specifier.exported));
    }
  }

  detectExportAllDeclaration(): void {
    this.#isExportAllDetected = true;
  }

  detectExportDefaultDeclaration(): void {
    this.#isExportDefaultDetected = true;
  }
}

const fetchFilename = (context: Rule.RuleContext) => {
  const absolutePath = path.resolve(context.getFilename());
  const [dirname, basename] = absolutePath.split(path.sep).slice(-2);
  const [filename] = basename.split('.');
  return filename === 'index' && dirname !== '' ? dirname : filename;
};

const getNameToCompare = (name: string) => name.replace(/[-_]/g, '').toLowerCase();
const isSameName = (name1: string, name2: string): boolean =>
  getNameToCompare(name1) === getNameToCompare(name2);

export const namedExport: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [{ enum: ['always', 'singular', 'plural'] }],
  },
  create: context => {
    const pluralize = new Pluralize(context.settings?.['filenames-simple']?.pluralize);
    const rule: PluralizeRule = context.options[0] ?? 'always';

    const filename = fetchFilename(context);
    const detector = new AloneExportNamedIdentifierDetector(context);

    return {
      ExportAllDeclaration: () => detector.detectExportAllDeclaration(),
      ExportDefaultDeclaration: () => detector.detectExportDefaultDeclaration(),
      ExportNamedDeclaration: node => detector.detectExportNamedDeclaration(node),
      'Program:exit': () => {
        if (!(rule === 'always' || pluralize.isValidName(filename, rule))) return;

        const exportedIdentifier = detector.aloneExportNamedIdentifier;
        if (!exportedIdentifier) return;
        if (isSameName(exportedIdentifier.name, filename)) return;

        context.report({
          node: exportedIdentifier,
          message:
            'The export name must match the filename. You need to rename to {{ pascalCase }} or {{ camelCase }}.',
          data: {
            pascalCase: presetRules.PascalCase.recommendationBuilder(filename),
            camelCase: presetRules.camelCase.recommendationBuilder(filename),
          },
        });
      },
    };
  },
};
