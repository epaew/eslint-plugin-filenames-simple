import path from 'path';
import { Rule } from 'eslint';
import { correct, Dictionaries, isValidName, setDictionaries } from '../utils/pluralize';

type Rules = {
  parentDir?: 'singular' | 'plural';
  file?: 'singular' | 'plural';
};
type Options = {
  dictionaries?: Dictionaries;
  rules: Rules;
};

const fetchFilename = (context: Rule.RuleContext): [string, string[]] => {
  const absolutePath = path.resolve(context.getFilename());
  const [dirname, basename] = absolutePath.split(path.sep).slice(-2);
  const filename = basename.split('.');

  return [dirname, filename];
};

const parseOptions = (context: Rule.RuleContext): Options => {
  const [rules = {}, dictionaries = {}] = context.options;
  return { rules, dictionaries };
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
      {
        type: 'object',
        properties: {
          irregular: {
            type: 'object',
            additionalProperties: { type: 'string' },
            minProperties: 1,
          },
          plural: {
            type: 'object',
            additionalProperties: { type: 'string' },
            minProperties: 1,
          },
          singular: {
            type: 'object',
            additionalProperties: { type: 'string' },
            minProperties: 1,
          },
          uncountable: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            uniqueItems: true,
          },
        },
        minProperties: 1,
      },
    ],
  },
  create: context => {
    const { rules, dictionaries } = parseOptions(context);
    dictionaries && setDictionaries(dictionaries);

    return {
      Program: node => {
        const [dirname, [filename, ...rest]] = fetchFilename(context);

        if (isValidName(dirname, rules.parentDir) && isValidName(filename, rules.file)) return;

        context.report({
          node: node,
          message:
            'The filename must follow the pluralize rule. Should rename to {{ dirname }}/{{ filename }}.{{ extname }}',
          data: {
            dirname: correct(dirname, rules.parentDir),
            filename: correct(filename, rules.file),
            extname: rest.join('.'),
          },
        });
      },
    };
  },
};
