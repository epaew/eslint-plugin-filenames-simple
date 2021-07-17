import { Rule } from 'eslint';

const defaultAllowedExtensions = [
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.d.ts',
  '.ts',
  '.tsx',
  '.vue',
  '.spec.js',
  '.spec.jsx',
  '.spec.ts',
  '.spec.tsx',
  '.test.js',
  '.test.jsx',
  '.test.ts',
  '.test.tsx',
];

export const getAllowedExtensions = (context: Pick<Rule.RuleContext, 'settings'>): string[] =>
  context.settings?.['filenames-simple']?.allowedExtensions ?? defaultAllowedExtensions;
