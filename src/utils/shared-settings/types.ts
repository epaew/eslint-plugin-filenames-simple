export type Extension = string;
export type Format = string;
export type LeadingDot = 'allow' | 'forbid' | 'require';

export interface PluralizeDictionary {
  irregular?: [string, string][];
  plural?: [string, string][];
  singular?: [string, string][];
  uncountable?: string[];
}

export interface ESLintSharedSettings {
  format?: Format;
  leadingDot?: LeadingDot;
  extension?: Extension | Extension[];
  pluralize?: PluralizeDictionary;
}
