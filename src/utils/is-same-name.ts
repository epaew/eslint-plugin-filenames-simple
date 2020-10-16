import { splitName } from './split-name';

// comparing names
export const isSameName = (name1: string, name2: string, ignoreCase = false): boolean => {
  if (!ignoreCase) return name1 === name2;

  const [words1, words2] = [splitName(name1), splitName(name2)];
  if (words1.length !== words2.length) return false;

  return words1.every((word, i) => word === words2[i]);
};
