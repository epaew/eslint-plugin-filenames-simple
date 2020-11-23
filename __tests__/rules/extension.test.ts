import { RuleTester } from 'eslint';

import { extension } from '#/rules/extension';

describe('rules/extension', () => {
  describe('without override settings', () => {
    const ruleTester = new RuleTester();

    ruleTester.run('extension', extension, {
      valid: [
        {
          code: '',
          filename: 'index.js',
        },
        {
          code: '',
          filename: 'index.cjs',
        },
        {
          code: '',
          filename: 'index.mjs',
        },
        {
          code: '',
          filename: 'index.jsx',
        },
        {
          code: '',
          filename: 'index.d.ts',
        },
        {
          code: '',
          filename: 'index.ts',
        },
        {
          code: '',
          filename: 'index.tsx',
        },
        {
          code: '',
          filename: 'index.vue',
        },
      ],
      invalid: [
        {
          code: '',
          filename: 'index.txt',
          errors: [
            {
              messageId: 'invalidExtension',
              data: { extensions: '.js,.cjs,.mjs,.jsx,.d.ts,.ts,.tsx,.vue' },
            },
          ],
        },
      ],
    });
  });

  describe('with override settings', () => {
    const ruleTester = new RuleTester({
      settings: { 'filenames-simple': { allowedExtensions: ['.mjs'] } },
    });

    ruleTester.run('extension', extension, {
      valid: [
        {
          code: '',
          filename: 'index.mjs',
        },
      ],
      invalid: [
        {
          code: '',
          filename: 'index.js',
          errors: [
            {
              messageId: 'invalidExtension',
              data: { extensions: '.mjs' },
            },
          ],
        },
        {
          code: '',
          filename: 'index.cjs',
          errors: [
            {
              messageId: 'invalidExtension',
              data: { extensions: '.mjs' },
            },
          ],
        },
      ],
    });
  });
});
