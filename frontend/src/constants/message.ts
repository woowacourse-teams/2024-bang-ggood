import { MAX_SELECT_CATEGORY_COUNT, MIN_SELECT_CUSTOM_COUNT } from '@/constants/system';
import { TipType } from '@/hooks/useHandleTip';

export const TIP_MESSAGE: Record<TipType, string> = {
  OPTION: '수리가 필요하다면, 미리 관리자에게 확인해 보세요!',
  CUSTOM_QUESTION: '집을 볼 때는 평균 10분 정도 소요돼요. 10개 정도의 질문을 준비해 두면 적당해요!',
};

type ModalMessageType = 'SUMMARY';

export const MODAL_MESSAGE: Record<ModalMessageType, string> = {
  SUMMARY: '방에 대한 한 줄 평을 적어주세요.',
};

type ToastType = 'ADD' | 'EDIT' | 'CUSTOM' | 'MIN_CUSTOM_SELECT' | 'MAX_SELECT' | 'LIKE_ERROR';

export const TOAST_MESSAGE: Record<ToastType, string> = {
  ADD: '체크리스트가 저장됐어요!',
  EDIT: '체크리스트가 수정됐어요!',
  CUSTOM: '편집을 완료했어요! ',
  MIN_CUSTOM_SELECT: `질문은 최소 ${MIN_SELECT_CUSTOM_COUNT}개 이상 선택해야해요!`,
  MAX_SELECT: `카테고리는 최대 ${MAX_SELECT_CATEGORY_COUNT}개까지만 선택할 수 있어요.`,
  LIKE_ERROR: '좋아요 처리 중 문제가 발생했습니다. \n나중에 다시 시도해주세요.',
};
