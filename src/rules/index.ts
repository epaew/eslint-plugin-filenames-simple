import { casing } from './casing';
import { namingConvention } from './naming-convention';

export const rules = {
  casing, // NOTE: Deprecated, I will remove this at v1.0.0
  'naming-convention': namingConvention,
};
