import { namingConvention } from './naming-convention';

export const casing = {
  ...namingConvention,
  meta: {
    ...namingConvention.meta,
    deprecated: true,
    replacedBy: ['naming-convention'],
  },
};
