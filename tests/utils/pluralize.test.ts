import * as pluralize from '#/utils/pluralize';

describe('pluralize.correct', () => {
  const subject = pluralize.correct;

  describe('when the rule is undefined', () => {
    const rule = undefined;

    it('returns same name', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual(names);
    });
  });

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
  const subject = pluralize.isValidName;

  describe('when the rule is undefined', () => {
    const rule = undefined;

    it('returns always true', () => {
      const names = ['test', 'tests'];
      expect(names.map(name => subject(name, rule))).toEqual([true, true]);
    });
  });

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

describe('pluralize.setDictionaries', () => {
  const dictionaries = {
    irregular: [['regular', 'irregular']] as [string, string][],
    plural: [['index', 'indexes']] as [string, string][],
    singular: [['shoes', 'shoes']] as [string, string][],
    uncountable: ['test'],
  };
  const subject = () => pluralize.setDictionaries(dictionaries);

  it('returns true when the name is plural', () => {
    // before setDictionaries()
    expect(pluralize.correct('regular', 'plural')).toBe('regulars');
    expect(pluralize.correct('index', 'plural')).toBe('indices');
    expect(pluralize.correct('shoes', 'singular')).toBe('shoe');
    expect(pluralize.correct('test', 'plural')).toBe('tests');

    subject();

    // after setDictionaries()
    expect(pluralize.correct('regular', 'plural')).toBe('irregular');
    expect(pluralize.correct('index', 'plural')).toBe('indexes');
    expect(pluralize.correct('shoes', 'singular')).toBe('shoes');
    expect(pluralize.correct('test', 'plural')).toBe('test');
  });
});
