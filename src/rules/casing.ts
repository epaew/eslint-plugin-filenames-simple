import { Rule } from 'eslint';

export const casing: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    // TODO: docs: {},
    // TODO: schema: [],
  },

  create: () => ({
    Program: () => {
      // TODO
    },
  }),
};
