export interface Article {
  articleId: number;
  keyword: string;
  title: string;
  summary: string;
  content?: string;
  thumbnail?: string | null;
  createdAt: string;
}

export interface ArticlePostForm {
  keyword: string;
  title: string;
  summary: string;
  content: string;
}
