export const series = async <T>(list: Array<() => Promise<T>>) => {
  const [item, ...chain] = list;
  if (item) {
    await item();
    await series(chain);
  }
};
