import { rules } from '#/rules';

import { fetchAllRuleNames } from '../test-utils/fetch-rule-names';

describe('Must include all rules', () => {
  const subject = (key: string) => typeof rules[key] !== 'undefined';

  test(`should include all rules`, () => {
    expect(fetchAllRuleNames().every(subject)).toBeTruthy();
  });
});
