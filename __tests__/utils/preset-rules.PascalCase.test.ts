import { presetRules } from '#/utils/preset-rules';

import targetNames from './seeds.json';

describe('presetRules.PascalCase', () => {
  describe('.expression', () => {
    const subject = (name: string) => presetRules.PascalCase.expression.test(name);

    test('should return false when name is normalcase', () => {
      expect(targetNames.normalCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return true when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return false when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is chaos case', () => {
      expect(targetNames.chaosCase.map(subject).some(n => n)).toBeFalsy();
    });
  });

  describe('.recommendationBuilder', () => {
    const subject = (name: string) => presetRules.PascalCase.recommendationBuilder(name);

    test('should return pascalized strings when name is narmalcase', () => {
      expect(targetNames.normalCase.map(subject)).toEqual([
        'Normalcase',
        'Threeormorewordsincludingnormalcase',
        'Normal0case',
        'Normalcase0',
      ]);
    });

    test('should return pascalized strings when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject)).toEqual([
        'CamelCase',
        'ThreeOrMoreWordsIncludingCamelCase',
        'Camel0Case',
        'CamelCase0',
      ]);
    });

    test('should return pascalized strings when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject)).toEqual([
        'KebabCase',
        'ThreeOrMoreWordsIncludingKebabCase',
        'Kebab0Case',
        'KebabCase0',
      ]);
    });

    test('should return same strings when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject)).toEqual(targetNames.pascalCase);
    });

    test('should return pascalized strings when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject)).toEqual([
        'SnakeCase',
        'ThreeOrMoreWordsIncludingSnakeCase',
        'Snake0Case',
        'SnakeCase0',
      ]);
    });
  });
});
