import { default as Ajv } from 'ajv';

import { ESLintSharedSettings } from './types';

export class ESLintSharedSettingsValidator {
  #ajv = new Ajv();
  #schema = {
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    properties: {
      format: { type: 'string', format: 'regex' },
      leadingDot: { type: 'string', enum: ['allow', 'forbid', 'require'] },
      extension: {
        anyOf: [
          { type: 'string', format: 'regex' },
          { type: 'array', items: { type: 'string', format: 'regex' } },
        ],
      },
      pluralize: {
        type: 'object',
        properties: {
          irregular: {
            type: 'array',
            items: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 2 },
          },
          plural: {
            type: 'array',
            items: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 2 },
          },
          singular: {
            type: 'array',
            items: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 2 },
          },
          uncountable: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  };

  validate(settings: ESLintSharedSettings): void {
    if (!this.#ajv.validate(this.#schema, settings)) {
      throw new Error(
        `The format of \`settings['filenames-simple']\` is invalid: ${this.#ajv.errorsText()}`,
      );
    }
  }
}
