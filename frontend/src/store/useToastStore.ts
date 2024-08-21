import { create } from 'zustand';

export type ToastType = 'positive' | 'negative';

interface toastState {
  toast: string | null;
  colorType: ToastType;
  showToast: (message: string) => void;
  hideToast: () => void;
  setColorType: (type: ToastType) => void;
}
/**
 * @description 전역 토스트를 보여주는 컨텍스트입니다.useToast 라는 훅으로만 조작합니다.
 * @property {string | null} toast - 현재 표시되고 있는 토스트 메시지. 메세지가 들어가면 해당 토스트가 나타납니다.
 * @property {function(string): void} showToast - 새로운 토스트 메시지를 표시하는 함수입니다. props 로 표시하고 싶은 메세지를 전달합니다.
 * @property {function(): void} hideToast - 현재 표시되고 있는 토스트 메시지를 숨기는 함수입니다. 기본적으로 3초 뒤에 사라지도록 설정되어 있습니다.
 */

const useToastStore = create<toastState>(set => ({
  toast: null,
  colorType: 'positive',
  showToast: (message: string) => {
    set(state => ({ ...state, toast: message }));
  },
  hideToast: () => {
    set(state => ({ ...state, toast: null }));
  },
  setColorType: (newType: ToastType) => {
    set(state => {
      if (state.colorType !== newType) {
        return { colorType: newType };
      }
      return state;
    });
  },
}));

export default useToastStore;
