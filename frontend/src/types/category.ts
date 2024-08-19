export type CategoryName = '청결' | '방 컨디션' | '편의시설' | '옵션' | '주거환경' | '안전' | '경제적';

export interface Category {
  categoryId: number;
  categoryName: CategoryName;
}

// TODO: 방비교 추후를 위해..
// export interface CategoryScore extends Category {
//   score?: number;
// }
