import targetNames from './seeds.json';

import { presetRules } from '#/utils/preset-rules';

describe('presetRules.camelCase', () => {
  describe('.expression', () => {
    const subject = (name: string) => presetRules.camelCase.expression.test(name);

    test('should return true when name is normalcase', () => {
      expect(targetNames.normalCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return true when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return false when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is chaos case', () => {
      expect(targetNames.chaosCase.map(subject).some(n => n)).toBeFalsy();
    });
  });

  describe('.recommendationBuilder', () => {
    const subject = (name: string) => presetRules.camelCase.recommendationBuilder(name);

    test('should return same strings when name is narmalcase', () => {
      expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
    });

    test('should return same strings when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject)).toEqual(targetNames.camelCase);
    });

    test('should return camelized strings when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject)).toEqual([
        'kebabCase',
        'threeOrMoreWordsIncludingKebabCase',
        'kebab0Case',
        'kebabCase0',
      ]);
    });

    test('should return camelized strings when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject)).toEqual([
        'pascalCase',
        'threeOrMoreWordsIncludingPascalCase',
        'pascal0Case',
        'pascalCase0',
        'ecmaScript',
      ]);
    });

    test('should return camelized strings when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject)).toEqual([
        'snakeCase',
        'threeOrMoreWordsIncludingSnakeCase',
        'snake0Case',
        'snakeCase0',
      ]);
    });
  });
});
