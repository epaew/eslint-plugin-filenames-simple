import { fetchAllRuleNames } from '../test-utils/fetch-rule-names';

import { rules } from '#/rules';

describe('Must include all rules', () => {
  const subject = (key: string) => (rules as { [key: string]: unknown | undefined })[key] !== undefined;

  test(`should include all rules`, () => {
    expect(fetchAllRuleNames().every(subject)).toBeTruthy();
  });
});
