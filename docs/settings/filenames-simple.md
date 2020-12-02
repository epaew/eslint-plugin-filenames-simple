# settings/filenames-simple
Specify the naming convention for files that you explicitly allow for use.

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "settings": {
    "filenames-simple": {
      "format": "PascalCase",
      "leadingDot": "allow",
      "extension": [
        "\\.js",
        "\\.d\\.ts"
      ],
      "pluralize": {
        "irregular": [["singular", "plural"], ["index", "indices"]],
        "uncountable": ["water"]
      }
    }
  }
}
```

## Options
* format
* leadingDot
* extension
* pluralize

### format
Specify one of the following naming conventions or your regular expression syntax.  
If you specify the regular expression, `^` at the beginning and `$` at the end of the expression are automatically completed.

* `camelCase` (lowerCamelCase)
* `kebab-case` (hyphen-case)
* `PascalCase` (UpperCamelCase)
* `snake_case` (underscore_case)

The default value is `kebab-case`.

### leadingDot
Specify the handling of filenames starting with `.`.

* `allow`: The filename can start with `.`.
* `forbid`: The filename cannot start with `.`.
* `require`: The filename must start with `.`.

The default value is `allow`.

### extension
Specify the file extensions you want to explicitly allow to use.  
Accepts a string, or an array of string which start with `\\.`
(The given strings will be converted with ```new RegExp(`${string}$`, 'u')```).

The default value is an array of following regular expressions.
* `/\.((spec|test)\.)?[jt]sx?$/`
* `/\.[cm]js$/`
* `/\.d\.ts$/`
* `/\.vue$/`

### pluralize
Specify the dictionary to pass to the `pluralize` library.  
Accepts an object with the following properties.
* `irregular`:   array of tuple [string, string]: arguments for `pluralize.addIrregularRule()`.
* `plural`:      array of tuple [string, string]: arguments for `pluralize.addPluralRule()`
* `singular`:    array of tuple [string, string]: arguments for `pluralize.addSingularRule()`
* `uncountable`: array of string:                 arguments for `pluralize.addUncountableRule()`

The default value is an empty object.  
See also: https://github.com/blakeembrey/pluralize#usage
