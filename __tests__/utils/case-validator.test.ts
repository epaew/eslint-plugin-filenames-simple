import { getCaseValidator } from '#/utils/case-validator';

describe('CaseValidator.getRecommendedName', () => {
  const subject = (rule: string, name: string) => {
    return getCaseValidator(rule).getRecommendedName(name);
  };

  describe('when the rule is camelCase', () => {
    const rule = 'camelCase';

    describe('when the name is camelCase', () => {
      const name = 'camelCase';

      it('returns same name', () => {
        expect(subject(rule, name)).toEqual(name);
      });
    });

    describe('when the name is PascalCase', () => {
      const name = 'PascalCase';

      it('returns camelized name', () => {
        expect(subject(rule, name)).toEqual('pascalCase');
      });
    });

    describe('when the name is chaos (cannot build recommendation).', () => {
      const name = '00001_chaos-Name';

      it('throws error', () => {
        expect(() => subject(rule, name)).toThrow('Failed to build recommendation.');
      });
    });
  });

  describe('when the rule is not in presets', () => {
    const rule = 'TEST_.*';
    const name = 'name';

    it('throws error', () => {
      expect(() => subject(rule, name)).toThrow('Not implemented');
    });
  });
});

describe('CaseValidator.validate', () => {
  const subject = (rule: string, ignorePatterns: string[], name: string) => {
    return getCaseValidator(rule, ignorePatterns).validate(name);
  };

  describe('when the rule is camelCase, with some ignorePatterns', () => {
    const rule = 'camelCase';
    const ignorePatterns = ['Ignored_.*'];

    describe('when the name is camelCase', () => {
      const name = 'camelCase';

      it('returns true', () => {
        expect(subject(rule, ignorePatterns, name)).toBeTruthy();
      });
    });

    describe('when the name is not camelCase, but matches the ignorePatterns', () => {
      const name = 'Ignored_pattern';

      it('returns true', () => {
        expect(subject(rule, ignorePatterns, name)).toBeTruthy();
      });
    });

    describe('when the name is not camelCase, and does not match the ignorePatterns', () => {
      const name = 'PascalCase';

      it('returns false', () => {
        expect(subject(rule, ignorePatterns, name)).toBeFalsy();
      });
    });
  });

  describe('when the rule is not in presets, with some ignorePatterns', () => {
    const rule = 'TEST_.*';
    const ignorePatterns = ['Ignored_.*'];

    describe('when the name matches rule', () => {
      const name = 'TEST_';

      it('returns true', () => {
        expect(subject(rule, ignorePatterns, name)).toBeTruthy();
      });
    });
  });
});
