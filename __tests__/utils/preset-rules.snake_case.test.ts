import { presetRules } from '#/utils/preset-rules';

import targetNames from './seeds.json';

describe('presetRules.snake_case', () => {
  describe('.expression', () => {
    const subject = (name: string) => presetRules.snake_case.expression.test(name);

    test('should return true when name is normalcase', () => {
      expect(targetNames.normalCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return false when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return false when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return true when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return false when name is chaos case', () => {
      expect(targetNames.chaosCase.map(subject).some(n => n)).toBeFalsy();
    });
  });

  describe('.recommendationBuilder', () => {
    const subject = (name: string) => presetRules.snake_case.recommendationBuilder(name);

    test('should return same strings when name is narmalcase', () => {
      expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
    });

    test('should return underscorized strings when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject)).toEqual([
        'camel_case',
        'three_or_more_words_including_camel_case',
        'camel0_case',
        'camel_case0',
      ]);
    });

    test('should return underscorized strings when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject)).toEqual([
        'kebab_case',
        'three_or_more_words_including_kebab_case',
        'kebab0_case',
        'kebab_case0',
      ]);
    });

    test('should return underscorized strings when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject)).toEqual([
        'pascal_case',
        'three_or_more_words_including_pascal_case',
        'pascal0_case',
        'pascal_case0',
        'ecma_script',
      ]);
    });

    test('should return same strings when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject)).toEqual(targetNames.snakeCase);
    });
  });
});
