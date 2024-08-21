export type CategoryName = '방 컨디션' | '창문' | '화장실' | '보안' | '외부';

export interface Category {
  categoryId: number;
  categoryName: CategoryName;
}

// TODO: 방비교 추후를 위해..
// export interface CategoryScore extends Category {
//   score?: number;
// }
