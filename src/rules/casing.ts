import path from 'path';
import { Rule } from 'eslint';

import { presetCases } from '../utils/preset-cases';
import { presetCaseConverters } from '../utils/preset-case-converters';

export const casing: Rule.RuleModule = {
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
    const { rule, excepts }: { rule: string; excepts: string[] } = context.options[0] ?? {
      rule: 'kebab-case',
      excepts: ['index'],
    };
    const ruleRegExp = presetCases[rule] ?? new RegExp(`^${rule}$`);
    const exceptRegExps = excepts.map(e => new RegExp(`^${e}$`));

    return {
      Program: node => {
        const [filename, ...rest] = path.basename(context.getFilename()).split('.');

        if (filename.length === 0) {
          context.report({ node, message: 'The filename is empty' });
        }

        if (exceptRegExps.some(re => re.test(filename))) return;

        if (!ruleRegExp.test(filename)) {
          const suggest = (() => {
            if (!presetCaseConverters[rule]) return null;

            const name = [presetCaseConverters[rule](filename), ...rest].join('.');
            return ` Should rename to ${name}`;
          })();
          const message = `The filename must follow the rule: '${rule}'.${suggest ?? ''}`;

          context.report({ node, message });
        }
      },
    };
  },
};
