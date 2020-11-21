import 'core-js/features/array/flat-map';

import path from 'path';
import { Rule } from 'eslint';
import { Identifier } from 'estree';

import { presetRules } from '../utils/preset-rules';
import { Pluralize } from '../utils/pluralize';

type PluralizeRule = 'always' | 'singular' | 'plural';

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
    const exportedIdentifiers = new Set<Identifier>();
    let isExportAllDetected = false;
    let isExportDefaultDetected = false;

    return {
      ExportAllDeclaration: () => {
        isExportAllDetected = true;
      },
      ExportDefaultDeclaration: () => {
        isExportDefaultDetected = true;
      },
      ExportNamedDeclaration: node => {
        if (node.declaration) {
          // NOTE: https://eslint.org/docs/developer-guide/working-with-rules#the-context-object
          //   > If the node is a FunctionDeclaration or FunctionExpression,
          //   > the variable for the function name is returned,
          //   > in addition to variables for the function parameters.
          context
            .getDeclaredVariables(node.declaration)
            .flatMap(variable => variable.defs)
            .filter(definition => definition.type !== 'Parameter')
            .forEach(definition => exportedIdentifiers.add(definition.name));
        } else {
          node.specifiers.forEach(specifier => exportedIdentifiers.add(specifier.exported));
        }
      },
      'Program:exit': () => {
        if (!(rule === 'always' || pluralize.isValidName(filename, rule))) return;

        if (isExportAllDetected || isExportDefaultDetected) return;
        if (exportedIdentifiers.size !== 1) return;

        const [exportedIdentifier] = exportedIdentifiers;
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
