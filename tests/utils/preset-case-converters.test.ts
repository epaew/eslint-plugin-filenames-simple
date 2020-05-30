import { presetCaseConverters } from '#/utils/preset-case-converters';

import targetNames from './seeds.json';

describe('PresetConverter of camelCase', () => {
  const subject = (name: string) => presetCaseConverters.camelCase(name);

  test('should return same strings when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
  });

  test('should return same strings when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual(targetNames.camelCase);
  });

  test('should return camelized strings when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual(['kebabCase', 'kebab0Case', 'kebabCase0']);
  });

  test('should return camelized strings when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual(['pascalCase', 'pascal0Case', 'pascalCase0']);
  });

  test('should return camelized strings when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual(['snakeCase', 'snake0Case', 'snakeCase0']);
  });
});

describe('PresetConverter of kebab-case', () => {
  const subject = (name: string) => presetCaseConverters['kebab-case'](name);

  test('should return same strings when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
  });

  test('should return hyphenized strings when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual(['camel-case', 'camel0-case', 'camel-case0']);
  });

  test('should return same strings when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual(targetNames.kebabCase);
  });

  test('should return hyphenized strings when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual(['pascal-case', 'pascal0-case', 'pascal-case0']);
  });

  test('should return hyphenized strings when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual(['snake-case', 'snake0-case', 'snake-case0']);
  });
});

describe('PresetConverter of PascalCase', () => {
  const subject = (name: string) => presetCaseConverters.PascalCase(name);

  test('should return pascalized strings when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual(['Normalcase', 'Normal0case', 'Normalcase0']);
  });

  test('should return pascalized strings when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual(['CamelCase', 'Camel0Case', 'CamelCase0']);
  });

  test('should return pascalized strings when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual(['KebabCase', 'Kebab0Case', 'KebabCase0']);
  });

  test('should return same strings when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual(targetNames.pascalCase);
  });

  test('should return pascalized strings when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual(['SnakeCase', 'Snake0Case', 'SnakeCase0']);
  });
});

describe('PresetConverter of snake_case', () => {
  const subject = (name: string) => presetCaseConverters.snake_case(name);

  test('should return same strings when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
  });

  test('should return underscorized strings when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual(['camel_case', 'camel0_case', 'camel_case0']);
  });

  test('should return underscorized strings when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual(['kebab_case', 'kebab0_case', 'kebab_case0']);
  });

  test('should return underscorized strings when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual(['pascal_case', 'pascal0_case', 'pascal_case0']);
  });

  test('should return same strings when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual(targetNames.snakeCase);
  });
});
