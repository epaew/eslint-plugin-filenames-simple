import { ESLintSharedSettingsValidator } from './eslint-shared-settings-validator';
import { ESLintSharedSettings, Format, LeadingDot, PluralizeDictionary } from './types';

export class SharedSettings {
  readonly format: Format = 'kebab-case';
  readonly leadingDot: LeadingDot = 'allow';
  readonly extensions: RegExp[] = [
    /\.((spec|test)\.)?[jt]sx?$/u,
    /\.[cm]js$/u,
    /\.d\.ts$/u,
    /\.vue$/u,
  ];
  readonly pluralize?: PluralizeDictionary;

  #validator = new ESLintSharedSettingsValidator();

  constructor(eslintSharedSettings: ESLintSharedSettings) {
    this.#validator.validate(eslintSharedSettings);

    if (eslintSharedSettings.format) this.format = eslintSharedSettings.format;
    if (eslintSharedSettings.leadingDot) this.leadingDot = eslintSharedSettings.leadingDot;
    if (eslintSharedSettings.extension) {
      this.extensions = this.getArrayOfString(eslintSharedSettings.extension).map(
        e => new RegExp(`${e}$`, 'u'),
      );
    }
    this.pluralize = eslintSharedSettings.pluralize;
  }

  private getArrayOfString(from: string | string[]): string[] {
    return Array.isArray(from) ? from : [from];
  }
}
