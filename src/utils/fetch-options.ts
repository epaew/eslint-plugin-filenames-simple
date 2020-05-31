import { Rule } from 'eslint';

type ExtnameOptions = [
  'lowercase' | 'lowercase-with-number' | 'UPPERCASE' | 'UPPERCASE_WITH_NUMBER',
];
type NamingConventionOptions = [{ rule: string; excepts: string[] }];
type Options = {
  extname: ExtnameOptions;
  'naming-convention': NamingConventionOptions;
};

const defaultOptions: Options = {
  extname: ['lowercase'],
  'naming-convention': [{ rule: 'kebab-case', excepts: ['index'] }],
};

const mergeOptionsValues = <T>(base: T, override: T | undefined): T => {
  switch (typeof base) {
    case 'string':
      return override ?? base;
    default:
      return { ...base, ...(override ?? {}) };
  }
};

const mergeOptions = (base: Options, ...overrides: Partial<Options>[]): Options => {
  return overrides.reduce<Options>((result, options) => {
    return {
      extname: result.extname.map((item, i) => mergeOptionsValues(item, options?.extname?.[i])),
      'naming-convention': result['naming-convention'].map((item, i) =>
        mergeOptionsValues(item, options?.['naming-convention']?.[i]),
      ),
    } as Options;
  }, base);
};

const fetchSharedOptions = (context: Rule.RuleContext): Partial<Options> => {
  const {
    extname,
    'naming-convention': namingConvention,
  }: Partial<{
    extname: ExtnameOptions[0];
    'naming-convention': NamingConventionOptions[0];
  }> = context.settings['filenames-simple'] ?? {};

  return {
    extname: extname && [extname],
    'naming-convention': namingConvention && [namingConvention],
  };
};

export const fetchOptions = (context: Rule.RuleContext, key: keyof Options): Options => {
  const sharedOptions = fetchSharedOptions(context);
  const contextOptions: Partial<Options> = { [key]: [...context.options] };

  return mergeOptions(defaultOptions, sharedOptions, contextOptions);
};
