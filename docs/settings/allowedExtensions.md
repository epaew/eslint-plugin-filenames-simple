# filenames-simple/allowedExtensions
Specify the file extensions you want to explicitly allow to use.

## Acceptable values
- String
  - starts with '.'.
  - consistings of letters, numbers and '.'

## Default values
- .js
- .cjs
- .mjs
- .jsx
- .d.ts
- .ts
- .tsx
- .vue

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/extension": "error"
  },
  "settings": {
    "filenames-simple": {
      "allowedExtensions": [".js", ".d.ts"]
    }
  }
}
```
