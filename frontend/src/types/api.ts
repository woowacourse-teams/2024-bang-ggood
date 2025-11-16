export interface Pagination<T> {
  buildings: T[];
  page: number; // 현재 페이지
  size: number; // 페이지 크기
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 건물 개수
}

export interface PaginationParams {
  page: number;
  size: number;
  search?: string;
  sort?: string;
}
