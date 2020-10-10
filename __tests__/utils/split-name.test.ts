import { splitName } from '#/utils/split-name';

import targetNames from './seeds.json';

describe('Split name written in camelCase', () => {
  const subject = (name: string) => splitName(name);

  test('should return words', () => {
    expect(targetNames.camelCase.map(subject)).toEqual([
      ['camel', 'case'],
      ['three', 'or', 'more', 'words', 'including', 'camel', 'case'],
      ['camel0', 'case'],
      ['camel', 'case0'],
    ]);
  });
});

describe('Split name written in kebab-case', () => {
  const subject = (name: string) => splitName(name);

  test('should return words', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual([
      ['kebab', 'case'],
      ['three', 'or', 'more', 'words', 'including', 'kebab', 'case'],
      ['kebab0', 'case'],
      ['kebab', 'case0'],
    ]);
  });
});

describe('Split name written in PascalCase', () => {
  const subject = (name: string) => splitName(name);

  test('should return words', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual([
      ['pascal', 'case'],
      ['three', 'or', 'more', 'words', 'including', 'pascal', 'case'],
      ['pascal0', 'case'],
      ['pascal', 'case0'],
    ]);
  });
});

describe('Split name written in snake_case', () => {
  const subject = (name: string) => splitName(name);

  test('should return words', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual([
      ['snake', 'case'],
      ['three', 'or', 'more', 'words', 'including', 'snake', 'case'],
      ['snake0', 'case'],
      ['snake', 'case0'],
    ]);
  });
});
