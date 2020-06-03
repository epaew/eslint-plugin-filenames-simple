import path from 'path';
import { ExportNamedDeclaration, Identifier, Program } from 'estree';
import { Rule } from 'eslint';

import '../utils/polyfill.node10';
import { isSameName } from '../utils/is-same-name';
import { presetCaseConverters } from '../utils/preset-case-converters';

const declarationParser = (node: ExportNamedDeclaration) => {
  if (!node.declaration) return [];

  switch (node.declaration.type) {
    case 'ClassDeclaration':
    case 'FunctionDeclaration':
      return [node.declaration.id];
    case 'VariableDeclaration':
      return node.declaration.declarations.map(n => n.id);
  }
};

const specifiersParser = (node: ExportNamedDeclaration) => node.specifiers.map(n => n.exported);

const fetchTargets = (node: Program) =>
  node.body
    .filter(n => n.type === 'ExportNamedDeclaration')
    .flatMap(n => [
      ...declarationParser(n as ExportNamedDeclaration),
      ...specifiersParser(n as ExportNamedDeclaration),
    ]) as Identifier[];

export const namedExport: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
  },
  create: context => {
    return {
      Program: node => {
        const [filename] = path.basename(context.getFilename()).split('.');

        const [target, ...rest] = fetchTargets(node as Program);
        if (!target || rest.length !== 0) return;
        if (isSameName(target.name, filename, true)) return;

        context.report({
          node: target,
          message:
            'The export name must match the filename.' +
            ` You need to rename to ${presetCaseConverters.PascalCase(filename)}` +
            ` or ${presetCaseConverters.camelCase(filename)}.`,
        });
      },
    };
  },
};
