import path from 'path';
import { Rule } from 'eslint';

export const noIndex: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
  },
  create: context => {
    return {
      Program: node => {
        const extname = path.extname(context.getFilename());
        const basename = path.basename(context.getFilename(), extname);

        if (basename.toLowerCase() === 'index') {
          context.report({ node, message: `Filename ${basename}${extname} is not allowed.` });
        }
      },
    };
  },
};
