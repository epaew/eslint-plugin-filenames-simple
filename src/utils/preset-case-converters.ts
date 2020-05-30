// Replace char at beginning of name
const camel2Pascal = (name: string) => name.replace(/^[a-z]/, match => match.toUpperCase());
const pascal2Camel = (name: string) => name.replace(/^[A-Z]/, match => match.toLowerCase());

// Replace all hyphen and underscore
const kebab2Snake = (name: string) => name.replace(/-/g, '_');
const snake2Kebab = (name: string) => name.replace(/_/g, '-');
const kebabAndSnake2CamelAndPascal = (name: string) =>
  name.replace(/[-_]([a-z])/g, (_, p1) => p1.toUpperCase());

// Replace all uppercase chars with hyphen or underscore, and lowercase
const camelAndPascal2Kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?:[a-z])/g, '$1-$2').toLowerCase();
const camelAndPascal2Snake = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?:[a-z])/g, '$1_$2').toLowerCase();

type PresetCaseConverters = {
  camelCase: (name: string) => string;
  'kebab-case': (name: string) => string;
  PascalCase: (name: string) => string;
  snake_case: (name: string) => string;
  [key: string]: (name: string) => string | undefined;
};

export const presetCaseConverters: PresetCaseConverters = {
  camelCase: name => kebabAndSnake2CamelAndPascal(pascal2Camel(name)),
  'kebab-case': name => snake2Kebab(camelAndPascal2Kebab(name)),
  PascalCase: name => kebabAndSnake2CamelAndPascal(camel2Pascal(name)),
  snake_case: name => kebab2Snake(camelAndPascal2Snake(name)),
};
