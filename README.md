# ESLint plugin filenames simple
An ESLint plugin to check filenames with simple configuration.  
This plugin is inspired by [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames).

## Requirements
* ESLint >= 7.0.0

## How to use
Modify your `.eslintrc` file to load the plugin and enable the rules.

```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/casing": "error"
  }
}
```

## Available rules
* casing: [casing](./docs/rules/casing.md)

## LICENSE
[MIT](./LICENSE)
