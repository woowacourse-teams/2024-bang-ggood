import '@testing-library/jest-dom';

import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import useToast from '@/hooks/useToast';

describe('useToast 테스트', () => {
  describe('showToast 함수 테스트', () => {
    const TOAST_MESSAGE = '토스트가 나타난다.';
    const TOAST_DURATION = 10;
    const TOAST_DURATION_MINUTE = TOAST_DURATION / 1000;

    it(`토스트에 메세지를 적으면 토스트가 메세지가 설정된다.`, async () => {
      const { result } = renderHook(() => useToast(TOAST_DURATION_MINUTE));

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
      });

      expect(result.current.toast).toBe(TOAST_MESSAGE);
    });

    it(`토스트를 나오게 한 후 ${TOAST_DURATION_MINUTE}초 뒤에 토스트의 메세지 state가 null이 된다.`, async () => {
      const { result } = renderHook(() => useToast(TOAST_DURATION_MINUTE));

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
      });
      expect(result.current.toast).toBe(TOAST_MESSAGE);
      await waitFor(() => expect(result.current.toast).toBe(null), { timeout: 200, interval: 10 });
    });

    it(`토스트 호출을 두번하면 이후 메세지로 토스가 바뀐다.`, async () => {
      const { result } = renderHook(() => useToast(TOAST_DURATION_MINUTE));
      const CHANGED_TOAST_MESSAGE = '토스트가 바뀌었다.';

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
        result.current.showToast(CHANGED_TOAST_MESSAGE);
      });

      expect(result.current.toast).toBe(CHANGED_TOAST_MESSAGE);
    });
  });
});
