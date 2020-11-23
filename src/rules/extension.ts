import path from 'path';

import { Rule } from 'eslint';

import { getAllowedExtensions } from '../utils/get-default-allowed-extensions';

export const extension: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    messages: {
      invalidExtension: 'The file extension is invalid. Allowed extensions are `{{ extensions }}`',
    },
    schema: [],
  },
  create: context => {
    const allowedExtensions = getAllowedExtensions(context);

    return {
      Program: node => {
        const filename = path.basename(context.getFilename());

        if (!allowedExtensions.some(ext => filename.endsWith(ext))) {
          context.report({
            node,
            messageId: 'invalidExtension',
            data: { extensions: allowedExtensions.join(',') },
          });
        }
      },
    };
  },
};
