import pluralize from 'pluralize';

import { Dictionaries, PluralizeRule } from './types';

export class Pluralize {
  readonly #pluralize: typeof pluralize;

  constructor(dictionaries?: Dictionaries) {
    this.#pluralize = pluralize;
    dictionaries && this.setDictionaries(dictionaries);
  }

  correct(name: string, rule: PluralizeRule): string {
    const corrector = {
      singular: this.#pluralize.singular,
      plural: this.#pluralize.plural,
    };
    return corrector[rule](name);
  }

  isValidName(name: string, rule: PluralizeRule): boolean {
    const validator = {
      singular: this.#pluralize.isSingular,
      plural: this.#pluralize.isPlural,
    };
    return validator[rule](name);
  }

  private setDictionaries({ irregular, plural, singular, uncountable }: Dictionaries) {
    irregular &&
      irregular.forEach(([singular, plural]) => this.#pluralize.addIrregularRule(singular, plural));
    plural &&
      plural.forEach(([plural, singular]) =>
        this.#pluralize.addPluralRule(new RegExp(plural), singular),
      );
    singular &&
      singular.forEach(([singular, plural]) =>
        this.#pluralize.addSingularRule(new RegExp(singular), plural),
      );
    uncountable && uncountable.forEach(this.#pluralize.addUncountableRule);
  }
}
