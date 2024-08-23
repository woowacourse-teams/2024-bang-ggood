import { TipType } from '@/hooks/useHandleTipBox';

export const TIP_MESSAGE: Record<TipType, string> = {
  OPTION: '수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!',
  CUSTOM_QUESTION: `집을 보는 시간은 평균 10분 이내로, 10개 정도의 질문 갯수가 확인하기 적당해요!`,
};

type ModalMessageType = 'SUMMARY';

export const MODAL_MESSAGE: Record<ModalMessageType, string> = {
  SUMMARY: '방에 대한 한줄평을 적어주세요',
};
