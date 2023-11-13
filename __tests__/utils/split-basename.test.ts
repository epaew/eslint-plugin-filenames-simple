import { splitBasename } from '#/utils/split-basename';

describe('splitBasename', () => {
  const subject = (basename: string, extensions: string[]) => splitBasename(basename, extensions);

  describe('when the extensions are .js,.ts,.d.ts', () => {
    const extensions = ['.js', '.ts', '.d.ts'];

    describe('when the basename is index.js', () => {
      const basename = 'index.js';

      it("returns ['index', '.js']", () => {
        expect(subject(basename, extensions)).toEqual(['index', '.js']);
      });
    });

    describe('when the basename is index.ts', () => {
      const basename = 'index.ts';

      it("returns ['index', '.ts']", () => {
        expect(subject(basename, extensions)).toEqual(['index', '.ts']);
      });
    });

    describe('when the basename is index.d.ts', () => {
      const basename = 'index.d.ts';

      it("returns ['index', '.d.ts']", () => {
        expect(subject(basename, extensions)).toEqual(['index', '.d.ts']);
      });
    });
  });

  describe('when allowed extensions is blank', () => {
    const extensions: string[] = [];

    describe('when the basename is index.d.ts', () => {
      const basename = 'index.d.ts';

      it("returns ['index.d.ts', '']", () => {
        expect(subject(basename, extensions)).toEqual(['index.d.ts', '']);
      });
    });
  });
});
