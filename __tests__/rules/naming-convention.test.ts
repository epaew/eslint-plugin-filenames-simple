import { RuleTester } from 'eslint';

import { namingConvention } from '#/rules/naming-convention';

const ruleTester = new RuleTester();

ruleTester.run('naming-convention', namingConvention, {
  valid: [
    { code: '', filename: 'kebab-case.js' },
    { code: '', filename: 'index.js', options: [{ rule: 'PascalCase' }] },
    { code: '', filename: 'index.js', options: [{ rule: '[a-z]*' }] },
    { code: '', filename: '.eslintrc.js', options: [{ excepts: ['\..+'] }] },
  ],
  invalid: [
    {
      code: '',
      filename: 'camelCase.js',
      errors: ["The filename must follow the rule: 'kebab-case'. Should rename to camel-case.js."],
    },
    {
      code: '',
      filename: '00001_chaos-Name.js',
      errors: ["The filename must follow the rule: 'kebab-case'."],
    },
    {
      code: '',
      filename: 'camelCase.js',
      options: [{ rule: '[a-z]*' }],
      errors: ["The filename must follow the rule: '[a-z]*'."],
    },
    {
      code: '',
      filename: '.dotfile',
      errors: ["The filename must follow the rule: 'kebab-case'."],
    },
  ],
});
