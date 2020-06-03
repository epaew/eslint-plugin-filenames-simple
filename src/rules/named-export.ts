import path from 'path';
import { ExportNamedDeclaration, Identifier, Program, VariableDeclaration } from 'estree';
import { Rule } from 'eslint';

import '../utils/polyfill.node10';

const declarationParser = (node: ExportNamedDeclaration) => {
  if (!node.declaration) return [];

  return (node.declaration as VariableDeclaration).declarations.map(n => n.id);
};

const specifiersParser = (node: ExportNamedDeclaration) => node.specifiers.map(n => n.exported);

const fetchTargets = (node: Program) =>
  node.body
    .filter(n => n.type === 'ExportNamedDeclaration')
    .flatMap(n => [
      ...declarationParser(n as ExportNamedDeclaration),
      ...specifiersParser(n as ExportNamedDeclaration),
    ]);

export const namedExport: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
  },
  create: context => {
    return {
      Program: node => {
        const [filename] = path.basename(context.getFilename()).split('.');

        const targets = fetchTargets(node as Program);
        console.log(targets);
        // if ((node as ExportNamedDeclaration).declaration) {
        //   declarationParser(context, node as ExportNamedDeclaration, filename);
        // } else {
        //   specifiersParser(context, node as ExportNamedDeclaration, filename);
        // }
      },
    };
  },
};
