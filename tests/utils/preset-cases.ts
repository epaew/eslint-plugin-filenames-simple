import { presetCases } from '#/utils/preset-cases';

import targetNames from './seeds.json';

describe('Preset RegExp of camelCase', () => {
  const subject = (name: string) => presetCases.camelCase.test(name);

  test('should return true when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return true when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return false when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual([false, false, false]);
  });
});

describe('Preset RegExp of kebab-case', () => {
  const subject = (name: string) => presetCases['kebab-case'].test(name);

  test('should return true when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return false when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return true when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return false when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual([false, false, false]);
  });
});

describe('Preset RegExp of PascalCase', () => {
  const subject = (name: string) => presetCases.PascalCase.test(name);

  test('should return false when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return true when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return false when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual([false, false, false]);
  });
});

describe('Preset RegExp of snake_case', () => {
  const subject = (name: string) => presetCases.snake_case.test(name);

  test('should return true when name is narmalcase', () => {
    expect(targetNames.normalCase.map(subject)).toEqual([true, true, true]);
  });

  test('should return false when name is camelCase', () => {
    expect(targetNames.camelCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is kebab-case', () => {
    expect(targetNames.kebabCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return false when name is PascalCase', () => {
    expect(targetNames.pascalCase.map(subject)).toEqual([false, false, false]);
  });

  test('should return true when name is snake_case', () => {
    expect(targetNames.snakeCase.map(subject)).toEqual([true, true, true]);
  });
});
