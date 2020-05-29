const toCamelCase = (name: string) =>
  name
    // for PascalCase
    .replace(/^[A-Z]/, match => match.toLowerCase())
    // for kebab-case and snake_case
    .replace(/[-_]([a-z])/, (_, p1) => p1.toUpperCase());

const toKebabCase = (name: string) =>
  name
    // for camelCase and PascalCase
    .replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?:[a-z])/, '$1-$2')
    .toLowerCase()
    // for snake_case
    .replace('_', '-');

const toPascalCase = (name: string) =>
  name
    // for camelCase, kebab-case and snake_case
    .replace(/^[a-z]/, match => match.toUpperCase())
    // for kebab-case and snake_case
    .replace(/[-_]([a-z])/, (_, p1) => p1.toUpperCase());

const toSnakeCase = (name: string) =>
  name
    // for camelCase and PascalCase
    .replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?:[a-z])/, '$1_$2')
    .toLowerCase()
    // for kebab-case
    .replace('-', '_');

type PresetCaseConverters = {
  camelCase: (name: string) => string;
  'kebab-case': (name: string) => string;
  PascalCase: (name: string) => string;
  snake_case: (name: string) => string;
  [key: string]: (name: string) => string | undefined;
};

export const presetCaseConverters: PresetCaseConverters = {
  camelCase: toCamelCase,
  'kebab-case': toKebabCase,
  PascalCase: toPascalCase,
  snake_case: toSnakeCase,
};
