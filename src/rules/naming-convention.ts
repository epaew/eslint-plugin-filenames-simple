import path from 'path';

import { Rule } from 'eslint';

import { getCaseValidator } from '../utils/case-validator';

export const namingConvention: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          rule: {
            anyOf: [
              { enum: ['camelCase', 'kebab-case', 'PascalCase', 'snake_case'] },
              { type: 'string', format: 'regex' },
            ],
            default: 'kebab-case',
          },
          excepts: {
            type: 'array',
            items: { type: 'string', format: 'regex' },
            default: ['index'],
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: context => {
    const { rule: ruleName, excepts }: { rule: string; excepts: string[] } = context.options[0] ?? {
      rule: 'kebab-case',
      excepts: ['index'],
    };
    const validator = getCaseValidator(ruleName, excepts);

    return {
      Program: node => {
        const { name: filename, ext: extension } = path.parse(context.getFilename());

        if (filename.length === 0) {
          context.report({ node, message: 'The filename is empty' });
        }

        if (validator.validate(filename)) return;

        const suggestion = (() => {
          try {
            const recommendedName = validator.getRecommendedName(filename);
            return ` Should rename to ${recommendedName}${extension}.`;
          } catch {
            // nothing to do
          }
        })();
        const message = `The filename must follow the rule: '${ruleName}'.${suggestion ?? ''}`;

        context.report({ node, message });
      },
    };
  },
};
