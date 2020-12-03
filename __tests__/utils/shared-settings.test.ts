import { getSharedSettings, SharedSettings } from '#/utils/shared-settings';

describe('getSharedSettings', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subject = (sharedSettings: any) =>
    getSharedSettings({ settings: { 'filenames-simple': sharedSettings } });

  describe('when the sharedSettings is empty', () => {
    const sharedSettings = undefined;

    it('returns an instance of SharedSettings with default values', () => {
      const result = subject(sharedSettings);

      expect(result).toBeInstanceOf(SharedSettings);
      expect(result).toEqual({
        format: 'kebab-case',
        leadingDot: 'allow',
        extensions: [/\.((spec|test)\.)?[jt]sx?$/u, /\.[cm]js$/u, /\.d\.ts$/u, /\.vue$/u],
      });
    });
  });

  describe('when the sharedSettings has `format` key', () => {
    describe('with a valid value: string', () => {
      const sharedSettings = { format: 'PascalCase' };

      it('returns a SharedSettings with specified format', () => {
        expect(subject(sharedSettings)).toHaveProperty('format', 'PascalCase');
      });
    });

    describe('with an invalid value', () => {
      const sharedSettings = { format: null };

      it('throws Error with message', () => {
        expect(() => subject(sharedSettings)).toThrow(
          "The format of `settings['filenames-simple']` is invalid:",
        );
      });
    });
  });

  describe('when the sharedSettings has `leadingDot` key', () => {
    describe('with a valid value: enum', () => {
      const sharedSettings = { leadingDot: 'forbid' };

      it('returns a SharedSettings with specified leadingDot', () => {
        expect(subject(sharedSettings)).toHaveProperty('leadingDot', 'forbid');
      });
    });

    describe('with an invalid value', () => {
      const sharedSettings = { leadingDot: -1 };

      it('throws Error with message', () => {
        expect(() => subject(sharedSettings)).toThrow(
          "The format of `settings['filenames-simple']` is invalid:",
        );
      });
    });
  });

  describe('when the sharedSettings has `extension` key', () => {
    describe('with a valid value: string', () => {
      const sharedSettings = { extension: '\\.d\\.ts' };

      it('returns a SharedSettings with array of specified extensions', () => {
        expect(subject(sharedSettings)).toHaveProperty('extensions', [/\.d\.ts$/u]);
      });
    });

    describe('with a valid value: array of string', () => {
      const sharedSettings = { extension: ['\\.d\\.ts'] };

      it('returns a SharedSettings with array of specified extensions', () => {
        expect(subject(sharedSettings)).toHaveProperty('extensions', [/\.d\.ts$/u]);
      });
    });

    describe('with an invalid value', () => {
      const sharedSettings = { extension: { format: '\\.d\\.ts' } };

      it('throws Error with message', () => {
        expect(() => subject(sharedSettings)).toThrow(
          "The format of `settings['filenames-simple']` is invalid:",
        );
      });
    });
  });

  describe('when the sharedSettings has `pluralize` key', () => {
    describe('when the pluralize has `irregular` key', () => {
      describe('with a valid value: array of [string, string] tuple', () => {
        const sharedSettings = {
          pluralize: { irregular: [['index', 'indices']] },
        };

        it('returns a SharedSettings with key `pluralize.irregular` that has specified tuple of array', () => {
          expect(subject(sharedSettings)).toHaveProperty('pluralize.irregular', [
            ['index', 'indices'],
          ]);
        });
      });

      describe('with an invalid value: array of string', () => {
        const sharedSettings = {
          pluralize: { irregular: ['index', 'indices'] },
        };

        it('throws Error with message', () => {
          expect(() => subject(sharedSettings)).toThrow(
            "The format of `settings['filenames-simple']` is invalid:",
          );
        });
      });
    });

    describe('when the pluralize has `singular` key', () => {
      describe('with a valid value: array of [string, string] tuple', () => {
        const sharedSettings = {
          pluralize: { singular: [['index', 'indices']] },
        };

        it('returns a SharedSettings with key `pluralize.singular` that has specified tuple of array', () => {
          expect(subject(sharedSettings)).toHaveProperty('pluralize.singular', [
            ['index', 'indices'],
          ]);
        });
      });

      describe('with an invalid value: array of string', () => {
        const sharedSettings = {
          pluralize: { singular: ['index', 'indices'] },
        };

        it('throws Error with message', () => {
          expect(() => subject(sharedSettings)).toThrow(
            "The format of `settings['filenames-simple']` is invalid:",
          );
        });
      });
    });

    describe('when the pluralize has `plural` key', () => {
      describe('with a valid value: array of [string, string] tuple', () => {
        const sharedSettings = {
          pluralize: { plural: [['indices', 'index']] },
        };

        it('returns a SharedSettings with key `pluralize.plural` that has specified tuple of array', () => {
          expect(subject(sharedSettings)).toHaveProperty('pluralize.plural', [
            ['indices', 'index'],
          ]);
        });
      });

      describe('with an invalid value: array of string', () => {
        const sharedSettings = {
          pluralize: { plural: ['indices', 'index'] },
        };

        it('throws Error with message', () => {
          expect(() => subject(sharedSettings)).toThrow(
            "The format of `settings['filenames-simple']` is invalid:",
          );
        });
      });
    });

    describe('when the pluralize has `uncountable` key', () => {
      describe('with a valid value: array of string', () => {
        const sharedSettings = {
          pluralize: { uncountable: ['water'] },
        };

        it('returns a SharedSettings with key `pluralize.uncountable` that has specified string of array', () => {
          expect(subject(sharedSettings)).toHaveProperty('pluralize.uncountable', ['water']);
        });
      });

      describe('with an invalid value: string', () => {
        const sharedSettings = {
          pluralize: { uncountable: 'water' },
        };

        it('throws Error with message', () => {
          expect(() => subject(sharedSettings)).toThrow(
            "The format of `settings['filenames-simple']` is invalid:",
          );
        });
      });
    });
  });
});
