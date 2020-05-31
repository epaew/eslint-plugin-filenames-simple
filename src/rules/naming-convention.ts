import path from 'path';
import { Rule } from 'eslint';

import { fetchOptions } from '../utils/fetch-options';
import { presetCases } from '../utils/preset-cases';
import { presetCaseConverters } from '../utils/preset-case-converters';

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
          },
          excepts: {
            type: 'array',
            items: { type: 'string', format: 'regex' },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: context => {
    const {
      'naming-convention': [{ rule, excepts }],
    } = fetchOptions(context, 'naming-convention');
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

            const alterName = presetCaseConverters[rule](filename) ?? '';
            if (!ruleRegExp.test(alterName)) return null;

            return ` Should rename to ${[alterName, ...rest].join('.')}.`;
          })();
          const message = `The filename must follow the rule: '${rule}'.${suggest ?? ''}`;

          context.report({ node, message });
        }
      },
    };
  },
};
