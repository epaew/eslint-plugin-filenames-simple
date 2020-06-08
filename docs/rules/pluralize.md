# filenames-simple/pluralize
This rule ensures that filenames are plural (or singular).

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/pluralize": [
      "error",
      {
        "parentDir": "plural",
        "file": "singular"
      },
      {
        "uncountable": ["water"]
      }
    ]
  }
}
```

## Available options
### rule: (the first option)
Specify one of the following naming conventions for each `parentDir` or `file`.

#### Naming convention presets
* singular
* plural

### dictionaries: (the second option)
Specify the dictionary to pass to the `pluralize` library.  
See also: https://github.com/blakeembrey/pluralize#usage

#### Keys and examples
* irregular: array of arguments for `pluralize.addIrregularRule()`
  * e.g. `[["singular", "plural"], ["person", "people"]]`
* plural: array of arguments for `pluralize.addPluralRule()`
  * e.g. `[["plural", "singular"]]`
* singular: array of arguments for `pluralize.addSingularRule()`
  * e.g. `[["singular", "plural"]]`
* uncountable: array of arguments for `pluralize.addUncountableRule()`
  * e.g. `["uncountable", "water"]`
