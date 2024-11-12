import { useStore } from 'zustand';

import useHandleTip from '@/hooks/useHandleTip';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import roomInfoStore from '@/store/roomInfoStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';

const useResetChecklist = () => {
  const roomInfoActions = useStore(roomInfoStore, state => state.actions);
  const roomInfoNonValidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);
  const { resetShowTip } = useHandleTip('OPTION');

  const resetChecklist = () => {
    roomInfoActions.reset();
    roomInfoNonValidatedActions.resetAll();
    selectedOptionActions.reset();
    resetShowTip();
  };

  return { resetChecklist };
};

export default useResetChecklist;
