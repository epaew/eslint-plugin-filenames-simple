# filenames-simple/pluralize

This rule ensures that filenames are plural (or singular).

## Configuration example

```json
{
  "plugins": ["filenames-simple"],
  "rules": {
    "filenames-simple/pluralize": [
      "error",
      {
        "parentDir": "plural",
        "file": "singular"
      }
    ]
  }
}
```

## Available options

### rule: (the first option)

Specify one of the following naming conventions for each `parentDir` or `file`.

#### Naming convention presets

- singular
- plural

## See also

- [settings/pluralize](../settings/pluralize.md)
