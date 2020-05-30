# ESLint plugin filenames simple
An ESLint plugin to check filenames with simple configuration.  
This plugin is inspired by [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames).

## Requirements
* Node.js: 10.x, 12.x, 14.x
* ESLint: 6.x, 7.x

## How to use
Modify your `.eslintrc` file to load the plugin and enable the rules.

```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/extname": ["error", "lowercase"],
    "filenames-simple/naming-convention": ["error", { "rule": "kebab-case" }]
  }
}
```

## Available rules
* [extname](./docs/rules/extname.md)
* [naming convention](./docs/rules/naming-convention.md)

## LICENSE
[MIT](./LICENSE)
