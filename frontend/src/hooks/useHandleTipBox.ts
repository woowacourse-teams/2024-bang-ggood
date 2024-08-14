import { useEffect, useState } from 'react';

const STORAGE_KEYS = {
  TIP: 'tipState',
};

const useHandleTipBox = (tipId: number) => {
  const [openTipIds, setOpenTipIds] = useState<Record<string, boolean>>(() => {
    const savedTipState = localStorage.getItem(STORAGE_KEYS.TIP);
    return savedTipState !== null ? JSON.parse(savedTipState) : {};
  });

  const toggleTipOpen = () => {
    setOpenTipIds(prev => {
      const newOpenTipIds = { ...prev, [tipId]: !prev[tipId] };
      localStorage.setItem(STORAGE_KEYS.TIP, JSON.stringify(newOpenTipIds));
      return newOpenTipIds;
    });
  };

  const getCurrentTipIsOpen = () => {
    return openTipIds[tipId];
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIP, JSON.stringify(openTipIds));
  }, [openTipIds]);

  return { isTipOpen: getCurrentTipIsOpen(), toggleTipOpen };
};

export default useHandleTipBox;
