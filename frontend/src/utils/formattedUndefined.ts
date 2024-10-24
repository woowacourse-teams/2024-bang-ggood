type ValueType = 'string' | 'number';

const formattedUndefined = (value: string | number | undefined, type: ValueType = 'number') => {
  if (value) return value;

  if (type === 'number') return '-';
  return `없음`;
};

export default formattedUndefined;
