import '@testing-library/jest-dom';

import { ThemeProvider } from '@emotion/react';
import { render, renderHook, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react';

import Toast from '@/components/common/Toast/Toast';
import useToast from '@/store/useToast';
import theme from '@/styles/theme';

const renderWithTheme = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe('useToast 테스트', () => {
  describe('showToast 함수 테스트', () => {
    beforeEach(() => {
      renderWithTheme(<Toast />);
    });
    const TOAST_MESSAGE = '토스트가 나타난다.';
    const TOAST_DURATION = 2000;
    const TOAST_DURATION_MINUTE = TOAST_DURATION / 1000;

    it(`토스트에 메세지를 적으면 토스트가 ${TOAST_DURATION_MINUTE}초간 나타난다.`, async () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
      });

      expect(screen.getByText(TOAST_MESSAGE)).toBeInTheDocument();
    });

    it(`토스트에 메세지를 적은 후 ${TOAST_DURATION_MINUTE}초 뒤에 토스트가 사라진다.`, async () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
      });
      expect(screen.getByText(TOAST_MESSAGE)).toBeInTheDocument();
      await waitForElementToBeRemoved(() => screen.getByText(TOAST_MESSAGE), { timeout: TOAST_DURATION });
    });

    it(`토스트에 메세지를 적은 후, 다른 메세지를 적으면 바뀐 메세지가 뜬다.`, async () => {
      const { result } = renderHook(() => useToast());
      const CHANGED_TOAST_MESSAGE = '토스트가 바뀌었다.';

      act(() => {
        result.current.showToast(TOAST_MESSAGE);
        result.current.showToast(CHANGED_TOAST_MESSAGE);
      });

      expect(result.current.toast).toBe(CHANGED_TOAST_MESSAGE);
      expect(screen.getByText(CHANGED_TOAST_MESSAGE)).toBeInTheDocument();
    });
  });
});
