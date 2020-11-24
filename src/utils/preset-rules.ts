type Rule = {
  expression: RegExp;
  recommendationBuilder?: (name: string) => string;
};
type PresetRules = {
  [key: string]: Required<Rule> | undefined;
  camelCase: Required<Rule>;
  'kebab-case': Required<Rule>;
  PascalCase: Required<Rule>;
  snake_case: Required<Rule>;
};

/*
 * Split the file/variable name written in camelCase, kebab-case, PascalCase, and snake_case.
 */
const splitName = (name: string): string[] => {
  return name
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?=[a-z])/g, '$1$3-$2$4')
    .toLowerCase()
    .split('-');
};

export const presetRules: PresetRules = {
  camelCase: {
    expression: /^[a-z][a-zA-Z0-9]*$/,
    recommendationBuilder: (name: string): string => {
      return splitName(name)
        .map((word, i) => {
          if (i === 0) return word;

          const [first, ...rest] = word;
          return `${first.toUpperCase()}${rest.join('')}`;
        })
        .join('');
    },
  },
  'kebab-case': {
    expression: /^[a-z][-a-z0-9]*$/,
    recommendationBuilder: (name: string): string => {
      return splitName(name).join('-');
    },
  },
  PascalCase: {
    expression: /^[A-Z][a-zA-Z0-9]*$/,
    recommendationBuilder: (name: string): string => {
      return splitName(name)
        .map(word => {
          const [first, ...rest] = word;
          return `${first.toUpperCase()}${rest.join('')}`;
        })
        .join('');
    },
  },
  snake_case: {
    expression: /^[a-z][_a-z0-9]*$/,
    recommendationBuilder: (name: string): string => {
      return splitName(name).join('_');
    },
  },
};

export const getRule = (expression: string): Rule => {
  const rule = presetRules[expression];
  return rule ?? { expression: new RegExp(`^${expression}$`) };
};
