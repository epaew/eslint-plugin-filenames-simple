import { casing } from './casing';
import { extname } from './extname';
import { namingConvention } from './naming-convention';

export const rules = {
  casing, // NOTE: Deprecated, I will remove this at v1.0.0
  extname,
  'naming-convention': namingConvention,
};
