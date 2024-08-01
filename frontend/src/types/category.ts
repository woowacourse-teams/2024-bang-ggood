export type CategoryName = '청결' | '방 컨디션' | '편의시설' | '옵션' | '주거환경' | '안전' | '경제적';

export interface Category {
  categoryId: number;
  categoryName: CategoryName;
}

export interface CategoryScore extends Category {
  score?: number;
}
