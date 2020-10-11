import path from 'path';
import { Rule } from 'eslint';

import { getRule } from '../utils/preset-rules';

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
    const rule = getRule(ruleName);
    const exceptRegExps = excepts.map(e => new RegExp(`^${e}$`));

    return {
      Program: node => {
        const [filename, ...rest] = path.basename(context.getFilename()).split('.');

        if (filename.length === 0) {
          context.report({ node, message: 'The filename is empty' });
        }

        if (exceptRegExps.some(re => re.test(filename))) return;

        if (!rule.expression.test(filename)) {
          const suggest = (() => {
            if (!rule.recommendationBuilder) return null;

            const alterName = rule.recommendationBuilder(filename);
            if (!rule.expression.test(alterName)) return null;

            return ` Should rename to ${[alterName, ...rest].join('.')}.`;
          })();
          const message = `The filename must follow the rule: '${ruleName}'.${suggest ?? ''}`;

          context.report({ node, message });
        }
      },
    };
  },
};
