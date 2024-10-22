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
