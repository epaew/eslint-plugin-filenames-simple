# filenames-simple/extname
This rule enforces file extensions to lowercase/UPPERCASE (and numbers).

## Configuration example
### configuration by rule context
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/extname": [
      "error",
      "lowercase"
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
    "filenames-simple/extname": "error"
  },
  "settings": {
    "filenames-simple": {
      "extname": "lowercase"
    }
  }
}
```

## Available options
### rule: (the first option)
Specify one of the following naming convention.

#### Naming convention presets
* lowercase (default)
* lowercase-with-number
* UPPERCASE
* UPPERCASE_WITH_NUMBER
