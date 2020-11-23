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
    const moduleIdentifiers = new Set<TSESTree.Identifier | TSESTree.Literal>();

    return {
      TSModuleDeclaration: node => {
        if (node.parent?.type === 'Program') moduleIdentifiers.add(node.id);
      },
      'Program:exit': () => {
        if (moduleIdentifiers.size !== 1) return;
        const moduleIdentifier = [...moduleIdentifiers][0];
        const moduleName = getModuleName(moduleIdentifier);

        if (!compareFilenameAndModuleName(getAbsoluteFilename(context), moduleName)) {
          context.report({
            node: moduleIdentifier,
            messageId: 'invalidFilename',
            data: { filename: `${moduleName}.d.ts` },
          });
        }
      },
    };
  },
};
