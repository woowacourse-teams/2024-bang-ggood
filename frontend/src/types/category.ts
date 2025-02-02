export type CategoryName = '방 컨디션' | '창문' | '화장실' | '보안' | '외부';

export interface Category {
  categoryId: number;
  categoryName: CategoryName;
}
