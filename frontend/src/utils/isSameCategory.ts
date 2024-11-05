import { Category } from '@/types/category';

const isSameCategory = (arr1: Category[], arr2: Category[]): boolean => {
  const ids1 = arr1.map(item => item.categoryId).sort((a, b) => a - b);
  const ids2 = arr2.map(item => item.categoryId).sort((a, b) => a - b);

  return ids1.length === ids2.length && ids1.every((id, index) => id === ids2[index]);
};

export default isSameCategory;
