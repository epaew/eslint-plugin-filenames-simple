# filenames-simple/extension
This rule enforces the target file extension is in the allowed extensions.

## Configuration example
```json
{
  "plugins": [
    "filenames-simple"
  ],
  "rules": {
    "filenames-simple/extension": "error"
  }
}
```

## Available options
No options are provided.
To override the allowed extensions, specify the `settings.filenames-simple.allowedExtensions`.

## See also
* [settings/allowedExtensions](../settings/allowedExtensions.md)
