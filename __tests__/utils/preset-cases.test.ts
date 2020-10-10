import { presetCases } from '#/utils/preset-cases';

import targetNames from './seeds.json';

describe('Preset RegExp of camelCase', () => {
  const subject = (name: string) => presetCases.camelCase.test(name);

  test('should return true when name is narmalcase', () => {
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

describe('Preset RegExp of kebab-case', () => {
  const subject = (name: string) => presetCases['kebab-case'].test(name);

  test('should return true when name is narmalcase', () => {
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

describe('Preset RegExp of PascalCase', () => {
  const subject = (name: string) => presetCases.PascalCase.test(name);

  test('should return false when name is narmalcase', () => {
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

describe('Preset RegExp of snake_case', () => {
  const subject = (name: string) => presetCases.snake_case.test(name);

  test('should return true when name is narmalcase', () => {
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
