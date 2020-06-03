import { splitName } from './split-name';

const buildCamelCase = (words: string[]): string =>
  words
    .map((word, i) => {
      if (i === 0) return word;

      const [first, ...rest] = word;
      return `${first.toUpperCase()}${rest.join('')}`;
    })
    .join('');
const buildKebabCase = (words: string[]): string => words.join('-');
const buildPascalCase = (words: string[]): string =>
  words
    .map(word => {
      const [first, ...rest] = word;
      return `${first.toUpperCase()}${rest.join('')}`;
    })
    .join('');
const buildSnakeCase = (words: string[]): string => words.join('_');

type PresetCaseConverters = {
  camelCase: (name: string) => string;
  'kebab-case': (name: string) => string;
  PascalCase: (name: string) => string;
  snake_case: (name: string) => string;
  [key: string]: (name: string) => string | undefined;
};

export const presetCaseConverters: PresetCaseConverters = {
  camelCase: name => buildCamelCase(splitName(name)),
  'kebab-case': name => buildKebabCase(splitName(name)),
  PascalCase: name => buildPascalCase(splitName(name)),
  snake_case: name => buildSnakeCase(splitName(name)),
};
