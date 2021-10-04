export const series = async (list: Array<() => Promise<any>>) => {
  const [item, ...chain] = list;
  if (item) {
    await item();
    await series(chain);
  }
};
