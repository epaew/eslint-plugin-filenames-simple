import { Rule } from 'eslint';

import { SharedSettings } from './shared-settings';
import { ESLintSharedSettings } from './types';

export const getSharedSettings = (context: Pick<Rule.RuleContext, 'settings'>): SharedSettings => {
  const eslintSharedSettings: ESLintSharedSettings = context.settings?.['filenames-simple'] ?? {};

  return new SharedSettings(eslintSharedSettings);
};
