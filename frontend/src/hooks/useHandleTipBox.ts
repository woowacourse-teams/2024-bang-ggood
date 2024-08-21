import { useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/localStorage';

export type TipType = 'OPTION' | 'CUSTOM_QUESTION';

/**
 * useHandleTipBox은 팁박스를 보이거나 / 숨기게 해주는 로직을 관리하는 훅입니다.
 * @param tipType : 팁의 타입, 이름을 나타냅니다.
 * @returns
 * closedTips 은 팁박스를 숨기는 함수입니다.
 * isTipOpen 는 해당 팁박스가 숨겨져 있는지 알려주는 boolean 입니다.
 * resetShowTipBox 는 다시 팁박스를 보이게 해주는 함수입니다.
 */

const useHandleTipBox = (tipType: TipType) => {
  const [closedTips, setClosedTips] = useState<Set<TipType>>(() => {
    const savedTipState = localStorage.getItem(STORAGE_KEYS.TIP);
    return new Set(JSON.parse(savedTipState ?? '[]'));
  });

  const closeTipBox = () => {
    setClosedTips(prev => new Set(prev).add(tipType));
  };

  const getCurrentTipIsOpen = () => {
    const hasTip = closedTips.has(tipType);
    return !hasTip;
  };

  const resetShowTipBox = () => {
    setClosedTips(prev => {
      const updatedState = new Set(prev);
      updatedState.delete(tipType);
      return updatedState;
    });
  };

  useEffect(() => {
    if (!closedTips.size) {
      return localStorage.removeItem(STORAGE_KEYS.TIP);
    }
    localStorage.setItem(STORAGE_KEYS.TIP, JSON.stringify(Array.from(closedTips)));
  }, [closedTips]);

  return { isTipOpen: getCurrentTipIsOpen(), closeTipBox, resetShowTipBox };
};

export default useHandleTipBox;
