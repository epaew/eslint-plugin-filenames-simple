# filenames-simple/pluralize
Specify the dictionary to pass to the `pluralize` library.  
See also: https://github.com/blakeembrey/pluralize#usage

## Acceptable keys
* irregular: array of arguments for `pluralize.addIrregularRule()`
* plural: array of arguments for `pluralize.addPluralRule()`
* singular: array of arguments for `pluralize.addSingularRule()`
* uncountable: array of arguments for `pluralize.addUncountableRule()`

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/named-export": ["error", "singular"],
    "filenames-simple/pluralize": ["error", { "parentDir": "plural", "file": "singular" }]
  },
  "settings": {
    "filenames-simple": {
      "pluralize": {
        "irregular": [["singular", "plural"], ["index", "indices"]],
        "uncountable": ["water"]
      }
    }
  }
}
```
