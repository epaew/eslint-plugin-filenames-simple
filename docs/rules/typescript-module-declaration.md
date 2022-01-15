# filenames-simple/typescript-module-declaration

This rule checks the filename includes name of declared module.

## Configuration example

```json
{
  "plugins": ["filenames-simple"],
  "rules": {
    "filenames-simple/typescript-module-declaration": "error"
  }
}
```

## Available options

No options are provided.

## Rule details

### Basic

- espree.d.ts

  ```typescript
  // OK
  declare module 'espree' {
    export function parse(code: string, options?: any): Node;
  }
  ```

- eslint.d.ts

  ```typescript
  // NG: The filename does not include the declared module name. We recommend renaming it to `espree.d.ts`.',
  declare module 'espree' {
    export function parse(code: string, options?: any): Node;
  }
  ```

- node.d.ts

  ```typescript
  // OK: More than two modules are declared in the target file.
  // https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
  declare module 'url' {
    export interface Url {
      protocol?: string;
      hostname?: string;
      pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
  }

  declare module 'path' {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export var sep: string;
  }
  ```

### With path separator, wildcard

- dayjs/locale/index.d.ts

  ```typescript
  // OK: The dirname includes the name of declared module.
  declare module 'dayjs/locale/*' {
    namespace locale {
      interface Locale extends ILocale {}
    }

    const locale: locale.Locale;

    export default locale;
  }
  ```

- json.d.ts
  ```typescript
  // OK
  // https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
  declare module 'json!*' {
    const value: any;
    export default value;
  }
  ```
