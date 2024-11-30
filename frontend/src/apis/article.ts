import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { Article, ArticlePostForm } from '@/types/article';

export const getArticleList = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.ARTICLES });
  const data = await response.json();
  return data.articles as Article[];
};

export const getArticle = async (id: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.ARTICLE_ID(id) });
  const data = await response.json();
  return data as Article;
};

export const postArticle = async (article: ArticlePostForm) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.ARTICLES, body: article });
  return response;
};
