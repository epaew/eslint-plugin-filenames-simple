# Unreleased
## Bugfix
* [#27](https://github.com/epaew/eslint-plugin-filenames-simple/pull/27) Fixed the behavior that ESLint execution fails
when the lint target includes TypeScript notation and the rule `named-export` is enabled.
* [#30](https://github.com/epaew/eslint-plugin-filenames-simple/pull/30)
    * Fixed false positives when statement contains both default export and single named export.
    * Fixed false positives when statement contains both all export (`export *`) and single named export.

# 0.3.0
## Features
* [#9](https://github.com/epaew/eslint-plugin-filenames-simple/pull/9) Add new rule `no-index`
* [#21](https://github.com/epaew/eslint-plugin-filenames-simple/pull/21) Add new rule `named-export`

## Others
* [#10](https://github.com/epaew/eslint-plugin-filenames-simple/pull/10) Add CHANGELOG.md
* [#17](https://github.com/epaew/eslint-plugin-filenames-simple/pull/17) Update package keywords
* Generate type declaration files

# 0.2.0
## Features
* [Caution] [#2](https://github.com/epaew/eslint-plugin-filenames-simple/pull/2) Rename rule `casing` to `naming-convention`
* [#4](https://github.com/epaew/eslint-plugin-filenames-simple/pull/4) Add rule `extname`
* [#5](https://github.com/epaew/eslint-plugin-filenames-simple/pull/5) Add rule presets

## Bugfix
* [#3](https://github.com/epaew/eslint-plugin-filenames-simple/pull/3) Fixup suggested filename in error message

## Others
* [#1](https://github.com/epaew/eslint-plugin-filenames-simple/pull/1) Fixup required version of Node.js and ESLint

# 0.1.1
## Others
* Fixup package metadata

# 0.1.0
Initial release
