import path from 'path';
import glob from 'glob';

import { presetCaseConverters } from '#/utils/preset-case-converters';
import { asyncArrayFilter } from './async-array-filter';

export const fetchAllRuleNames = () =>
  glob.sync(path.join(__dirname, '../../src/rules/*.ts')).map(p => path.basename(p, '.ts'));

export const fetchAvailableRuleNames = async () => {
  return asyncArrayFilter<string>(fetchAllRuleNames(), async name => {
    if (name === 'index') return false;

    const camelizedName = presetCaseConverters['camelCase'](name);
    const rule = await import(name);

    return !rule[camelizedName].meta.deprecated;
  });
};
