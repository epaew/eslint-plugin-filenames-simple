import { presetRules } from '#/utils/preset-rules';

import targetNames from './seeds.json';

describe('presetRules.kebab-case', () => {
  describe('.expression', () => {
    const subject = (name: string) => presetRules['kebab-case'].expression.test(name);

    test('should return true when name is normalcase', () => {
      expect(targetNames.normalCase.map(subject).every(n => n)).toBeTruthy();
    });

    test('should return false when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject).some(n => n)).toBeFalsy();
    });

    test('should return true when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject).every(n => n)).toBeTruthy();
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
    const subject = (name: string) => presetRules['kebab-case'].recommendationBuilder(name);

    test('should return same strings when name is narmalcase', () => {
      expect(targetNames.normalCase.map(subject)).toEqual(targetNames.normalCase);
    });

    test('should return hyphenized strings when name is camelCase', () => {
      expect(targetNames.camelCase.map(subject)).toEqual([
        'camel-case',
        'three-or-more-words-including-camel-case',
        'camel0-case',
        'camel-case0',
      ]);
    });

    test('should return same strings when name is kebab-case', () => {
      expect(targetNames.kebabCase.map(subject)).toEqual(targetNames.kebabCase);
    });

    test('should return hyphenized strings when name is PascalCase', () => {
      expect(targetNames.pascalCase.map(subject)).toEqual([
        'pascal-case',
        'three-or-more-words-including-pascal-case',
        'pascal0-case',
        'pascal-case0',
        'ecma-script',
      ]);
    });

    test('should return hyphenized strings when name is snake_case', () => {
      expect(targetNames.snakeCase.map(subject)).toEqual([
        'snake-case',
        'three-or-more-words-including-snake-case',
        'snake0-case',
        'snake-case0',
      ]);
    });
  });
});
