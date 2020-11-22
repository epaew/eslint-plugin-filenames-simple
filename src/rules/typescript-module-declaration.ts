import path from 'path';

import { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import { Rule } from 'eslint';

const compareFilenameAndModuleName = (filename: string, moduleName: string): boolean =>
  filename.includes(moduleName.toLowerCase());

const getModuleName = (identifier: TSESTree.Literal | TSESTree.Identifier): string =>
  identifier.type === 'Literal'
    ? (identifier.value as string).split(new RegExp(`[${path.sep}*!]`))[0]
    : identifier.name;

const getAbsoluteFilename = (context: Pick<Rule.RuleContext, 'getFilename'>): string =>
  path.resolve(context.getFilename());

export const typescriptModuleDeclaration: TSESLint.RuleModule<'invalidFilename', []> = {
  meta: {
    type: 'suggestion',
    messages: {
      invalidFilename:
        'The filename/dirname does not include the declared module name. We recommend renaming to `{{ filename }}`.',
    },
    schema: [],
  },
  create: context => {
    let program: TSESTree.Program;
    const moduleIdentifiers = new Set<TSESTree.Identifier | TSESTree.Literal>();

    return {
      Program: node => {
        program = node;
      },
      TSModuleDeclaration: node => {
        if (node.parent?.type === 'Program') moduleIdentifiers.add(node.id);
      },
      'Program:exit': () => {
        if (moduleIdentifiers.size !== 1) return;
        const moduleName = getModuleName([...moduleIdentifiers][0]);

        if (!compareFilenameAndModuleName(getAbsoluteFilename(context), moduleName)) {
          context.report({
            node: program,
            messageId: 'invalidFilename',
            data: { filename: `${moduleName}.d.ts` },
          });
        }
      },
    };
  },
};
