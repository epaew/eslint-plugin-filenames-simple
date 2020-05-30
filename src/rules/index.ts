import { Rule } from 'eslint';

import { casing } from './casing';
import { extname } from './extname';
import { namingConvention } from './naming-convention';
import { noIndex } from './no-index';

type Rules = { [key: string]: Rule.RuleModule | undefined };

export const rules: Rules = {
  casing, // NOTE: Deprecated, I will remove this at v1.0.0
  extname,
  'naming-convention': namingConvention,
  'no-index': noIndex,
};
