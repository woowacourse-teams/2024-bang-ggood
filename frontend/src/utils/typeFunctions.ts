export const mapObjNullToUndefined = <K extends PropertyKey, V>(obj: Record<K, V>) => {
  return objectMap(obj, ([key, value]) => [key, value ?? undefined]);
};

export const mapObjUndefinedToNull = <K extends PropertyKey, V>(obj: Partial<Record<K, V>>) => {
  return objectMap(obj, ([key, value]) => [key, value ?? null]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectMap = <Value, Return>(
  obj: Record<PropertyKey, Value>,
  func: ([key, value]: [PropertyKey, Value]) => [PropertyKey, Return],
) => Object.fromEntries(Object.entries(obj).map(func));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectFilter = (obj: object, func: ([key, value]: [string, any]) => boolean) =>
  Object.fromEntries(Object.entries(obj).filter(func));

interface ToStringable {
  toString(): string;
}

export const objectMapToString = <T extends Record<PropertyKey, ToStringable>>(obj: T) =>
  objectMap(obj, ([key, value]) => [key, value.toString()]);

export const objectOmit = <T extends object>(obj: T, omit: Set<string>) => objectFilter(obj, ([key]) => !omit.has(key));
