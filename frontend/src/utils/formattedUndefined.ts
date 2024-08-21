type ValueType = 'string' | 'number';

const formattedUndefined = (value: string | number | undefined, type: ValueType = 'number', valueTitle?: string) => {
  if (value) return value;

  if (type === 'number') return '-';
  return `${valueTitle} 정보 없음`;
};

export default formattedUndefined;
