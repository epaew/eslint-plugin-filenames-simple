import path from 'path';

import { Rule } from 'eslint';

import { getPluralize, PluralizeRule } from '../utils/pluralize';

type Rules = {
  parentDir?: 'singular' | 'plural';
  file?: 'singular' | 'plural';
};

const fetchFilename = (context: Rule.RuleContext): [string, string[]] => {
  const absolutePath = path.resolve(context.getFilename());
  const [dirname, basename] = absolutePath.split(path.sep).slice(-2);
  const filename = basename.split('.');

  return [dirname, filename];
};

export const pluralize: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          parentDir: { enum: ['singular', 'plural'] },
          file: { enum: ['singular', 'plural'] },
        },
        minProperties: 1,
      },
    ],
  },
  create: context => {
    const pluralize = getPluralize(context);
    const rules: Rules = context.options[0] ?? {};

    const correctedName = (name: string, rule?: PluralizeRule) => (rule ? pluralize.correct(name, rule) : name);
    const isValidName = (name: string, rule?: PluralizeRule) => (rule ? pluralize.isValidName(name, rule) : true);

    return {
      Program: node => {
        const [dirname, [filename, ...rest]] = fetchFilename(context);

        if (isValidName(dirname, rules.parentDir) && isValidName(filename, rules.file)) {
          return;
        }

        context.report({
          node: node,
          message:
            'The filename must follow the pluralize rule. Should rename to {{ dirname }}/{{ filename }}.{{ extname }}',
          data: {
            dirname: correctedName(dirname, rules.parentDir),
            filename: correctedName(filename, rules.file),
            extname: rest.join('.'),
          },
        });
      },
    };
  },
};
