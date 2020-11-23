import { casing } from './casing';
import { extension } from './extension';
import { extname } from './extname';
import { namedExport } from './named-export';
import { namingConvention } from './naming-convention';
import { noIndex } from './no-index';
import { pluralize } from './pluralize';
import { typescriptModuleDeclaration } from './typescript-module-declaration';

export const rules = {
  casing, // NOTE: Deprecated, I will remove this at v1.0.0
  extension,
  extname, // NOTE: Deprecated, I will remove this at v1.0.0
  'named-export': namedExport,
  'naming-convention': namingConvention,
  'no-index': noIndex,
  pluralize,
  'typescript-module-declaration': typescriptModuleDeclaration,
};
