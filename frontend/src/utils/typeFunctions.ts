export const mapObjNullToUndefined = <T extends object>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ?? undefined]));
};
export const mapObjUndefinedToNull = <T extends object>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ?? null]));
};
