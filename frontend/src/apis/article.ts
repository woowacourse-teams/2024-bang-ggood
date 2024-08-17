import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { Article } from '@/types/article';

export const getArticleList = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.ARTICLES });
  const data = await response.json();
  return data.articles as Article[];
};
