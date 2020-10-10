import { Dictionaries, Pluralize } from '#/utils/pluralize';

describe('pluralize.correct', () => {
  const pluralize = new Pluralize();
  const subject: typeof pluralize.correct = (name, rule) => pluralize.correct(name, rule);

  describe('when the rule is singular', () => {
    const rule = 'singular';

    it('returns always singular name', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual(['test', 'test']);
    });
  });

  describe('when the rule is plural', () => {
    const rule = 'plural';

    it('returns always plural name', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual(['tests', 'tests']);
    });
  });
});

describe('pluralize.isValidName', () => {
  const pluralize = new Pluralize();
  const subject: typeof pluralize.isValidName = (name, rule) => pluralize.isValidName(name, rule);

  describe('when the rule is singular', () => {
    const rule = 'singular';

    it('returns true when the name is singular', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual([true, false]);
    });
  });

  describe('when the rule is plural', () => {
    const rule = 'plural';

    it('returns true when the name is plural', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual([false, true]);
    });
  });
});

// NOTE: This test affects other tests because the instance of `pluralize` is a singleton.
describe('new Pluralize()', () => {
  const subject = (dictionaries?: Dictionaries) => new Pluralize(dictionaries);

  describe('when the dictionaries are undefined', () => {
    const dictionaries = undefined;

    it('uses default dictionaries of pluralize.', () => {
      const pluralize = subject(dictionaries);

      expect(pluralize.correct('regular', 'plural')).toBe('regulars');
      expect(pluralize.correct('index', 'plural')).toBe('indices');
      expect(pluralize.correct('shoes', 'singular')).toBe('shoe');
      expect(pluralize.correct('test', 'plural')).toBe('tests');
    });
  });

  describe('when the dictionaries are present', () => {
    const dictionaries: Dictionaries = {
      irregular: [['regular', 'irregular']],
      plural: [['index', 'indexes']],
      singular: [['shoes', 'shoes']],
      uncountable: ['test'],
    };

    it('uses customized dictionaries.', () => {
      const pluralize = subject(dictionaries);

      expect(pluralize.correct('regular', 'plural')).toBe('irregular');
      expect(pluralize.correct('index', 'plural')).toBe('indexes');
      expect(pluralize.correct('shoes', 'singular')).toBe('shoes');
      expect(pluralize.correct('test', 'plural')).toBe('test');
    });
  });
});
