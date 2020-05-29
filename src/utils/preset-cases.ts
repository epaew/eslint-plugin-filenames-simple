type PresetCases = {
  camelCase: RegExp;
  'kebab-case': RegExp;
  PascalCase: RegExp;
  snake_case: RegExp;
  [key: string]: RegExp | undefined;
};

export const presetCases: PresetCases = {
  camelCase: /^[a-z][a-zA-Z0-9]*$/,
  'kebab-case': /^[a-z][-a-z0-9]*$/,
  PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
  snake_case: /^[a-z][_a-z0-9]*$/,
};
