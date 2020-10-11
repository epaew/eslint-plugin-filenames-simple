import path from 'path';
import glob from 'glob';

import { presetRules } from '#/utils/preset-rules';
import { asyncArrayFilter } from './async-array-filter';

export const fetchAllRuleNames = () =>
  glob
    .sync(path.join(__dirname, '../../src/rules/*.ts'))
    .map(pathname => path.basename(pathname, '.ts'))
    .filter(name => name !== 'index');

export const fetchAvailableRuleNames = async () => {
  return asyncArrayFilter<string>(fetchAllRuleNames(), async name => {
    const camelizedName = presetRules.camelCase.recommendationBuilder(name);

    try {
      const rule = await import(name);
      return !rule[camelizedName].meta.deprecated;
    } catch {
      return false;
    }
  });
};
