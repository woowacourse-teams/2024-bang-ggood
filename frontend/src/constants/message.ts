import { TipType } from '@/hooks/useHandleTipBox';

export const TIP_MESSAGE: Record<TipType, string> = {
  OPTION: '수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!',
  CUSTOM_QUESTION: '하나의 집을 보러가는 시간을 10분으로 가정했을 때, 적당한 질문의 갯수는 10개 내외입니다!',
};
