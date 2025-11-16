export type ArticleType =
  | '계약 꿀팁'
  | '자취 일기'
  | '생활 꿀팁'
  | '동네 추천'
  | '방끗 활용법'
  | '우테코 생활'
  | '자취 꿀팁';

export const ARTICLE_TYPES: ArticleType[] = [
  '계약 꿀팁',
  '자취 일기',
  '생활 꿀팁',
  '동네 추천',
  '방끗 활용법',
  '우테코 생활',
  '자취 꿀팁',
];

export interface Article {
  articleId: number;
  keyword: ArticleType;
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
  thumbnail?: string;
}
