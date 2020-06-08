import { Rule } from 'eslint';

import { casing } from './casing';
import { extname } from './extname';
import { namedExport } from './named-export';
import { namingConvention } from './naming-convention';
import { noIndex } from './no-index';
import { pluralize } from './pluralize';

type Rules = { [key: string]: Rule.RuleModule | undefined };

export const rules: Rules = {
  casing, // NOTE: Deprecated, I will remove this at v1.0.0
  extname,
  'named-export': namedExport,
  'naming-convention': namingConvention,
  'no-index': noIndex,
  pluralize,
};
