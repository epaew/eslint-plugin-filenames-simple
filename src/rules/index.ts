import { extension } from './extension';
import { namedExport } from './named-export';
import { namingConvention } from './naming-convention';
import { noIndex } from './no-index';
import { pluralize } from './pluralize';
import { typescriptModuleDeclaration } from './typescript-module-declaration';

export const rules = {
  extension,
  'named-export': namedExport,
  'naming-convention': namingConvention,
  'no-index': noIndex,
  pluralize,
  'typescript-module-declaration': typescriptModuleDeclaration,
};
