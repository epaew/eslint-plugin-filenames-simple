import path from 'path';
import { Rule } from 'eslint';

import { ESTreeParser } from '../utils/estree-parser';
import { Identifier, Program } from '../utils/estree-parser/types';
import { presetRules } from '../utils/preset-rules';
import { Pluralize } from '../utils/pluralize';

type PluralizeRule = 'always' | 'singular' | 'plural';

const fetchFilename = (context: Rule.RuleContext) => {
  const absolutePath = path.resolve(context.getFilename());
  const [dirname, basename] = absolutePath.split(path.sep).slice(-2);
  const [filename] = basename.split('.');
  return filename === 'index' && dirname !== '' ? dirname : filename;
};

const fetchTargets = (node: Program): Identifier[] => {
  const programParser = new ESTreeParser(node);

  const exportAllDeclarations = programParser.getExportAllDeclarationsFromProgram().unwrap();
  const exportDefaultDeclarations = programParser
    .getExportDefaultDeclarationsFromProgram()
    .unwrap();
  if (exportAllDeclarations.length !== 0 || exportDefaultDeclarations.length !== 0) return [];

  return programParser
    .getExportNamedDeclarationsFromProgram()
    .getIdentifiersFromExportNamedDeclaration()
    .unwrap() as Identifier[];
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

    return {
      Program: node => {
        const filename = fetchFilename(context);

        if (!(rule === 'always' || pluralize.isValidName(filename, rule))) return;

        const [target, ...rest] = fetchTargets(node as Program);
        if (!target || rest.length !== 0) return;
        if (isSameName(target.name, filename)) return;

        context.report({
          node: target,
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
