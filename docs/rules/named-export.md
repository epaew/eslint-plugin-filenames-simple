# filenames-simple/named-export
This rule checks the export name is same as filename.

**NOTE:** this rule is only enabled when `parserOptions.ecmaVersion` in `.eslintrc` is set to `6` (`2015`) or later.

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/named-export": ["error", "singular"]
  }
}
```


## Available options
### rule: (the first option)
Specify one of the following as the file naming convention to which this rule applies.

#### Naming convention presets
* always (default): Always check the export name.
* singular: Check the export name only if filename is singular.
* plural: Check the export name only if filename is plural.


## Rule details
### Basic
* module.js
    ```javascript
    // OK
    export const module = 1;
    ```
* module.js
    ```javascript
    // NG: You can use `mod.js` or `Mod.js` as filename.
    export const mod = 1;
    ```

* module.js
    ```javascript
    // default export is ignored
    const module = 1;
    export default module;
    ```
* modules.js
    ```javascript
    // Multiple named exports are ignored too.
    const module1 = 1;
    const module2 = 2;
    export { module1, module2 };
    ```
* module.js
    ```javascript
    // It is ignored when the file includes both default export and named export.
    const module = 1;
    export default module;
    export const extraModule = { key: 'value' };
    ```

### When the name of exported module contains two or more words
* my-class.js
    ```javascript
    /*
     * When the name of exported module is written in camelCase or PascalCase,
     * the filename can be written in `kebab-case`, `camelCase` or `PascalCase`
     */
    export class MyClass {}
    ```
* myFunction.js
    ```javascript
    // `my-function.js`, `MyFunction.js` is also OK.
    export function myFunction() {}
    ```

### When the filename is `index.js` (`index.ts`)
* src/rules/index.js
    ```javascript
    // The rule checks the parent directory name with the name of exported module.
    export const rules = {};
    ```
* src/config/index.js
    ```javascript
    // Multiple named export are ignored.
    export { all } from './all';
    export { recommended } from './recommended';
    ```

### You can also lint TypeScript notations
* fruits.ts
    ```typescript
    export enum fruits {
      orange = 'orange',
      apple = 'apple',
      banana = 'banana',
    }
    ```
* identifier.ts
    ```typescript
    export interface Identifier {
      name: string;
    }
    ```
* class-expression.d.ts
    ```typescript
    export type ClassExpression = { id: Identifier }
    ```

#### NOTE: This rule skips the detection of named exports in TypeScript module blocks.
* @types/espree.d.ts
    ```typescript
    declare module 'espree' {
      export function parse(code: string, options?: any): Node;
    }
    ```

## See also
* [settings/pluralize](../settings/pluralize.md)
