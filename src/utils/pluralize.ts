import pluralize from 'pluralize';

type Rule = 'singular' | 'plural';
export type Dictionaries = {
  irregular?: [string, string][];
  plural?: [string, string][];
  singular?: [string, string][];
  uncountable?: string[];
};

export const correct = (name: string, rule?: Rule) => {
  const corrector = {
    singular: pluralize.singular,
    plural: pluralize.plural,
  };
  return rule ? corrector[rule](name) : name;
};

export const isValidName = (name: string, rule?: Rule) => {
  const validator = {
    singular: pluralize.isSingular,
    plural: pluralize.isPlural,
  };
  return rule ? validator[rule](name) : true;
};

export const setDictionaries = (dictionaries: Dictionaries) => {
  const keys: Array<keyof Dictionaries> = ['irregular', 'plural', 'singular', 'uncountable'];
  const dictionarySetter = {
    irregular: ([singular, plural]: [string, string]) =>
      pluralize.addIrregularRule(singular, plural),
    plural: ([plural, singular]: [string, string]) =>
      pluralize.addPluralRule(new RegExp(plural), singular),
    singular: ([singular, plural]: [string, string]) =>
      pluralize.addSingularRule(new RegExp(singular), plural),
    uncountable: (uncountable: string) => pluralize.addUncountableRule(uncountable),
  };

  keys.forEach(key => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dictionaries[key] && dictionaries[key].forEach(dictionarySetter[key]);
  });
};
