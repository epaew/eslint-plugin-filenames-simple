import { fetchAvailableRuleNames } from '../test-utils/fetch-rule-names';

import { all } from '#/configs/all';

describe('Config of all must include all available rules', () => {
  const subject = (key: string) => all.rules?.[key];

  test(`should include all available rules`, () => {
    fetchAvailableRuleNames().then(availableRuleNames => {
      expect(availableRuleNames.map(rule => `filenames-simple/${rule}`).every(subject)).toBeTruthy();
    });
  });
});
