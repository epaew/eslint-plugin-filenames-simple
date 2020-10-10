import { isSameName } from '#/utils/is-same-name';

describe('isSameName()', () => {
  const subject = (name1: string, name2: string, ignoreCase?: boolean) =>
    isSameName(name1, name2, ignoreCase);
  const name1 = 'testString';

  describe('When ignoreCase is `false`', () => {
    const ignoreCase = false;

    test('compare camelCase with camelCase', () => {
      const name2 = 'testString';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with kebab-case', () => {
      const name2 = 'test-string';
      expect(subject(name1, name2, ignoreCase)).toBeFalsy();
    });

    test('compare camelCase with PascalCase', () => {
      const name2 = 'TestString';
      expect(subject(name1, name2, ignoreCase)).toBeFalsy();
    });

    test('compare camelCase with snake_case', () => {
      const name2 = 'test_string';
      expect(subject(name1, name2, ignoreCase)).toBeFalsy();
    });
  });

  describe('When ignoreCase is `true`', () => {
    const ignoreCase = true;

    test('compare camelCase with camelCase', () => {
      const name2 = 'testString';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with kebab-case', () => {
      const name2 = 'test-string';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with PascalCase', () => {
      const name2 = 'TestString';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with snake_case', () => {
      const name2 = 'test_string';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with camelCase, when name2 contains different words', () => {
      const name2 = 'testStringThree';
      expect(subject(name1, name2, ignoreCase)).toBeFalsy();
    });
  });

  describe('When ignoreCase is undefined', () => {
    const ignoreCase = undefined;

    test('compare camelCase with camelCase', () => {
      const name2 = 'testString';
      expect(subject(name1, name2, ignoreCase)).toBeTruthy();
    });

    test('compare camelCase with kebab-case', () => {
      const name2 = 'test-string';
      expect(subject(name1, name2, ignoreCase)).toBeFalsy();
    });
  });
});
