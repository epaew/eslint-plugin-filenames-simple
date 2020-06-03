/*
 * Split the file/variable name written in camelCase, kebab-case, PascalCase, and snake_case.
 */
export const splitName = (name: string): string[] => {
  return name
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z])(?:[a-z])/g, '$1-$2')
    .toLowerCase()
    .split('-');
};
