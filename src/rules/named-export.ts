import path from 'path';
import { Rule } from 'eslint';

import '../utils/polyfill.node10';
import { Identifier, Program, ESTreeParser } from '../utils/estree-parser';
import { isSameName } from '../utils/is-same-name';
import { presetCaseConverters } from '../utils/preset-case-converters';

const fetchFilename = (context: Rule.RuleContext) => {
  const absolutePath = path.resolve(context.getFilename());
  const [dirname, basename] = absolutePath.split(path.sep).slice(-2);
  const [filename] = basename.split('.');
  return filename === 'index' && dirname !== '' ? dirname : filename;
};

const fetchTargets = (node: Program): Identifier[] =>
  new ESTreeParser(node)
    .getExportNamedDeclarationfromProgram()
    .getIdentifiersFromExportNamedDeclaration().results as Identifier[];

export const namedExport: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
  },
  create: context => {
    return {
      Program: node => {
        const filename = fetchFilename(context);

        const [target, ...rest] = fetchTargets(node as Program);
        if (!target || rest.length !== 0) return;
        if (isSameName(target.name, filename, true)) return;

        context.report({
          node: target,
          message:
            'The export name must match the filename. You need to rename to {{ pascalCase }} or {{ camelCase }}.',
          data: {
            pascalCase: presetCaseConverters.PascalCase(filename),
            camelCase: presetCaseConverters.camelCase(filename),
          },
        });
      },
    };
  },
};
