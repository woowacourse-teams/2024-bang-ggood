import { AmplitudeService } from '@/service/amplitude/AmplitudeService';

const amplitudeService = new AmplitudeService();

// Login Buttons
export const trackBasicLoginButton = () => {
  amplitudeService.customTrack('[Click] 일반 로그인 버튼');
};

export const trackKakaoLoginButton = () => {
  amplitudeService.customTrack('[Click] 카카오 로그인 버튼');
};

export const trackGuestLoginButton = () => {
  amplitudeService.customTrack('[Click] 게스트 로그인 버튼');
};

// Checklist Tabs
export const trackTabButton = (buttonName: string) => {
  amplitudeService.customTrack(`[Click] ${buttonName} 탭 버튼`);
};

// Checklist Room Info
export const trackRoomInfoInput = (name: string) => {
  amplitudeService.customTrack(`[Write] ${name} 폼 작성`);
};

// Checklist Option select
export const trackOption = (name: string) => {
  amplitudeService.customTrack(`[Select] ${name} 옵션 선택`);
};

// Checklist Question Check
export const trackChecklistQuestion = (id: number) => {
  amplitudeService.customTrack(`[Check] 질문 ${id} 답변 선택`);
};

// Save Checklist Button
export const trackSaveChecklist = () => {
  amplitudeService.customTrack(`[Click] 체크리스트 저장 버튼 (서머리 모달 이동)`);
};

// Submit Checklist Button
export const trackSubmitChecklist = () => {
  amplitudeService.customTrack(`[Click] 체크리스트 제출 버튼`);
};

// etc
export const trackNotCompleteChecklist = () => {
  amplitudeService.customTrack(`[Click] 체크리스트 작성 중 뒤로가기 버튼`);
};
