# (deprecated) filenames-simple/extname

This rule enforces file extensions to lowercase/UPPERCASE (and numbers).

## Configuration example

```json
{
  "plugins": ["filenames-simple"],
  "rules": {
    "filenames-simple/extname": ["error", "lowercase"]
  }
}
```

## Available options

### rule: (the first option)

Specify one of the following naming convention.

#### Naming convention presets

- lowercase (default)
- lowercase-with-number
- UPPERCASE
- UPPERCASE_WITH_NUMBER
