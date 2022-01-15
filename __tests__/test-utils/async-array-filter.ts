// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncArrayFilter = async <T = any>(arr: Array<T>, asyncCallback: (item: T) => Promise<boolean>) => {
  const evaluated = await Promise.all(arr.map(asyncCallback));
  return arr.filter((_, i) => evaluated[i]);
};
