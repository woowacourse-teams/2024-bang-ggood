type ValueType = 'string' | 'number';

export const formattedUndefined = (value: string | number | undefined, type: ValueType = 'number') => {
  if (value) return value;

  if (type === 'number') return '-';
  return `없음`;
};
