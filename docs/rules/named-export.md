# filenames-simple/named-export
This rule checks the export name is same as filename.

**NOTE:** this rule is only enabled when `parserOptions.ecmaVersion` in `.eslintrc` is set to `6` (`2015`) or later.

## Examples
### Basic
* module.js
    ```js
    export const module = 1; // OK
    ```
* module.js
    ```js
    export const mod = 1; // NG: You can use `module` or `Module` as export name.
    ```

* module.js
    ```js
    // default export is ignored
    const module = 1;
    export default const;
    ```
* modules.js
    ```js
    // Multiple named exports are ignored too.
    const module1 = 1;
    const module2 = 2;
    export { module1, module2 };
    ```

### When the filename contains two or more words
* my-class.js
    ```js
    /*
     * When filename is written in kebab-case, camelCase or PascalCase,
     * the export name can be written in `camelCase` or `PascalCase`
     */
    export class MyClass {}
    ```
* myFunction.js
    ```js
    export function myFunction() {}
    ```

### When the filename is `index.js` (`index.ts`)
* src/rules/index.js
    ```js
    // You can use parent directory name as export name.
    export const rules = {};
    ```
* src/config/index.js
    ```js
    // Multiple named export are ignored.
    export * from './all';
    export * from './recommended';
    ```


## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/named-export": "error"
  }
}
```

## Available options
No options are provided.
