import { RuleTester } from 'eslint';
import { pluralize } from '#/rules/pluralize';

const ruleTester = new RuleTester();

ruleTester.run('pluralize', pluralize, {
  valid: [
    {
      code: '',
      filename: 'src/controller/index.js',
    },
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ parentDir: 'singular' }],
    },
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ file: 'singular' }],
    },
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ parentDir: 'singular', file: 'singular' }],
    },
    {
      code: '',
      filename: 'src/controllers/index.js',
      options: [{ parentDir: 'plural', file: 'singular' }],
    },
    {
      code: '',
      filename: 'src/controller/indices.js',
      options: [{ parentDir: 'singular', file: 'plural' }],
    },
    {
      code: '',
      filename: 'src/controllers/indices.js',
      options: [{ parentDir: 'plural', file: 'plural' }],
    },
    {
      code: '',
      filename: 'src/lib/index.js',
      options: [
        { parentDir: 'plural', file: 'singular' },
        { irregular: [['person', 'people']], uncountable: ['lib'] },
      ],
    },
  ],
  invalid: [
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ parentDir: 'plural', file: 'singular' }],
      errors: [
        'The filename must follow the pluralize rule. Should rename to controllers/index.js',
      ],
    },
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ parentDir: 'plural' }],
      errors: [
        'The filename must follow the pluralize rule. Should rename to controllers/index.js',
      ],
    },
    {
      code: '',
      filename: 'src/controller/index.js',
      options: [{ file: 'plural' }],
      errors: [
        'The filename must follow the pluralize rule. Should rename to controller/indices.js',
      ],
    },
  ],
});
