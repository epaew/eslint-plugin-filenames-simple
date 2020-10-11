import { getRule, presetRules } from '#/utils/preset-rules';

describe('getRule', () => {
  const subject = getRule;

  describe('when the rule is camelCale', () => {
    const rule = 'camelCase';

    it('returns presetRules.camelCase', () => {
      expect(subject(rule)).toEqual(presetRules.camelCase);
    });
  });

  describe('when the rule is not defined in presetRules', () => {
    const rule = 'index';

    it('returns a new object with the field `expression` constructed based on the specified rule.', () => {
      expect(subject(rule)).toEqual({ expression: new RegExp(`^${rule}$`) });
    });
  });
});
