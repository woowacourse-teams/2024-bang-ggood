import { MAX_SELECT_CATEGORY_COUNT } from '@/constants/system';
import { TipType } from '@/hooks/useHandleTipBox';

export const TIP_MESSAGE: Record<TipType, string> = {
  OPTION: '수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!',
  CUSTOM_QUESTION: `집을 보는 시간은 평균 10분 이내로, 10개 정도의 질문 갯수가 확인하기 적당해요!`,
};

type ModalMessageType = 'SUMMARY';

export const MODAL_MESSAGE: Record<ModalMessageType, string> = {
  SUMMARY: '방에 대한 한줄평을 적어주세요',
};

type ToastType = 'ADD' | 'EDIT' | 'MAX_SELECT';

export const TOAST_MESSAGE: Record<ToastType, string> = {
  ADD: '체크리스트가 저장되었습니다.',
  EDIT: '체크리스트가 수정되었습니다.',
  MAX_SELECT: `카테고리는 최대 ${MAX_SELECT_CATEGORY_COUNT}개까지만 선택 가능합니다.`,
};
