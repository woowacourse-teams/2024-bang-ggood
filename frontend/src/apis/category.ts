import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const getCategory = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CATEGORY });
  const data = await response.json();
  return data.categories;
};

export const postCategory = async (categoryIds: number[]) => {
  await fetcher.post({ url: BASE_URL + ENDPOINT.CATEGORY_ADD, body: { categoryIds: categoryIds } });
};
