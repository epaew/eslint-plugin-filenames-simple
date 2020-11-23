import { Rule } from 'eslint';

const defaultAllowedExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.d.ts', '.ts', '.tsx', '.vue'];

export const getAllowedExtensions = (context: Pick<Rule.RuleContext, 'settings'>): string[] =>
  context.settings?.['filenames-simple']?.allowedExtensions ?? defaultAllowedExtensions;
