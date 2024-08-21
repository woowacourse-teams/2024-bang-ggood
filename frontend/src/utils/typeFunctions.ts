export const mapObjNullToUndefined = <T extends object>(obj: T) => {
  return objectMap(obj, ([key, value]) => [key, value ?? undefined]);
};

export const mapObjUndefinedToNull = <T extends object>(obj: T) => {
  return objectMap(obj, ([key, value]) => [key, value ?? null]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectMap = (obj: object, func: ([key, value]: [string, any]) => any) =>
  Object.fromEntries(Object.entries(obj).map(func));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectFilter = (obj: object, func: ([key, value]: [string, any]) => boolean) =>
  Object.fromEntries(Object.entries(obj).filter(func));

export const objectMapToString = <T extends object>(obj: T) =>
  objectMap(obj, ([key, value]) => [key, value.toString()]);

export const objectOmit = <T extends object>(obj: T, omit: Set<string>) => objectFilter(obj, ([key]) => !omit.has(key));
