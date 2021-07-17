/*
 * Split the file basename into the filename and extension.
 */
export const splitBasename = (basename: string, extensions: string[]): [string, string] => {
  for (const extension of extensions.sort((x, y) => y.length - x.length)) {
    const lastIndex = basename.lastIndexOf(extension);
    if (lastIndex === -1) continue;

    return [basename.substring(0, lastIndex), extension];
  }

  return [basename, ''];
};
