# ESLint plugin filenames simple
An ESLint plugin to check filenames with simple configuration.  
This plugin is inspired by [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames).

## Requirements
* Node.js: 10.x, 12.x, 14.x
* ESLint: 6.x, 7.x

## Getting started
1. Install eslint and this plugin via npm/yarn
    ```sh
    npm i --save-dev eslint eslint-plugin-filenames-simple
    # or
    yarn add -D eslint eslint-plugin-filenames-simple
    ```

2. Modify your `.eslintrc` file to load the plugin and enable the rules.
    ```javascript
    // select one of the following
    {
      "extends": [
        "plugin:filenames-simple/recommended"       // for pure ECMAScript/TypeScript project
        "plugin:filenames-simple/recommended-react" // for React.js project
        "plugin:filenames-simple/recommended-vue"   // for Vue.js project
      ]
    }
    ```
    ```javascript
    // or configure manually
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
