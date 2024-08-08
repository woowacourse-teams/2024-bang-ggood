export const mapNullToUndefined = <T extends object>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ?? undefined]));
};
