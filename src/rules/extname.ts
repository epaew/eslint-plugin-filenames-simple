import path from 'path';
import { Rule } from 'eslint';

import { fetchOptions } from '../utils/fetch-options';

const REGEXP = {
  lowercase: /^[a-z]+$/,
  'lowercase-with-number': /^[a-z][a-z0-9]*$/,
  UPPERCASE: /^[A-Z]+$/,
  UPPERCASE_WITH_NUMBER: /^[A-Z][A-Z0-9]*$/,
};

export const extname: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [
      { enum: ['lowercase', 'lowercase-with-number', 'UPPERCASE', 'UPPERCASE_WITH_NUMBER'] },
    ],
  },
  create: context => {
    const {
      extname: [style],
    } = fetchOptions(context, 'extname');
    const regex = REGEXP[style];

    return {
      Program: node => {
        const [, ...extnames] = path.basename(context.getFilename()).split('.');

        if (!extnames.every(ext => regex.test(ext))) {
          context.report({ node, message: `File extension must be ${style}.` });
        }
      },
    };
  },
};
