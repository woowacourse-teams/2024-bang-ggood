// 지하철역 정보
export interface Station {
  name: string; // 역 이름
  distance: number; // 도보 소요 시간(분)
  lines: string[]; // 환승 가능한 호선 목록
}

// 건물 정보
export interface Building {
  buildingId: number; // 건물 ID
  buildingName: string; // 건물 이름
  checklistCount: number; // 체크리스트 개수
  station: Station; // 인근 지하철역 정보
  isLiked: boolean; // 좋아요 여부
  thumbnail: string; // 썸네일 URL
}

// API 응답 전체 구조
export interface BuildingsResponse {
  buildings: Building[]; // 건물 리스트
  page: number; // 현재 페이지
  size: number; // 페이지 크기
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 건물 개수
}
