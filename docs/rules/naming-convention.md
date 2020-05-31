# filenames-simple/naming-convention
This rule make sure the filename follows the naming convention.

## Configuration example
### configuration by rule context
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/naming-convention": [
      "error",
      {
        "rule": "CamelCase",
        "excepts": ["index"]
      }
    ]
  }
}
```

### configuration by shared settings
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/naming-convention": "error"
  },
  "settings": {
    "filenames-simple": {
      "naming-convention": {
        "rule": "CamelCase",
        "excepts": ["index"]
      }
    }
  }
}
```

## Available options
### rule
Specify one of the following naming conventions or your regular expression syntax.  
If you specify the regular expression, `^` at the beginning and `$` at the end of the expression are automatically completed.

#### Naming convention presets
* camelCase (lowerCamelCase)
* kebab-case (hyphen-case, default)
* PascalCase (UpperCamelCase)
* snake_case (underscore_case)

### excepts
Specify filenames in regular expression syntax that ignores the above naming convention.  
`^` at the beginning and `$` at the end of the expression are automatically completed.  
This options accepts an array of strings.

default value: `["index"]`
