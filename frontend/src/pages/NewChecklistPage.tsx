import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import AlertModal from '@/components/_common/Modal/AlertModal/AlertModal';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SubmitModalWithSummary from '@/components/NewChecklist/SubmitModalWithSummary/SubmitModalWithSummary';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useHandleTipBox from '@/hooks/useHandleTipBox';
import useChecklistTemplate from '@/hooks/useInitialChecklist';
import useModal from '@/hooks/useModal';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';

const NewChecklistPage = () => {
  const navigate = useNavigate();
  useChecklistTemplate(); // 체크리스트 질문 가져오기 및 준비

  const { tabs } = useNewChecklistTabs();

  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomInfoUnvalidatedActions = useStore(roomInfoUnvalidatedStore, state => state.actions);
  const checklistActions = useChecklistStore(state => state.actions);
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);
  const { resetShowTipBox } = useHandleTipBox('OPTION');

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: openMemoModal, closeModal: closeMemoModal } = useModal();

  // 한줄평 모달
  const { isModalOpen: isSubmitModalOpen, openModal: openSummaryModal, closeModal: closeSummaryModal } = useModal();

  // 뒤로가기 시 휘발 경고 모달
  const { isModalOpen: isAlertModalOpen, openModal: openAlertModal, closeModal: closeAlertModal } = useModal();

  const resetAndGoHome = () => {
    roomInfoActions.resetAll();
    roomInfoUnvalidatedActions.resetAll();
    checklistActions.reset();
    selectedOptionActions.reset();
    resetShowTipBox(); // 옵션의 팁박스 다시표시
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={openAlertModal} />}
        center={<Header.Text>새 체크리스트</Header.Text>}
        right={<Button label="저장" size="xSmall" color="dark" onClick={openSummaryModal} />}
      />
      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        <Tabs tabList={tabs} />
        <NewChecklistContent />
      </TabProvider>

      {isMemoModalOpen ? (
        <MemoModal isModalOpen={isMemoModalOpen} modalClose={closeMemoModal} />
      ) : (
        <MemoButton onClick={openMemoModal} />
      )}

      {isSubmitModalOpen && (
        <SubmitModalWithSummary
          isModalOpen={isSubmitModalOpen}
          onConfirm={resetAndGoHome}
          modalClose={closeSummaryModal}
          mutateType="add"
        />
      )}
      {isAlertModalOpen && (
        <AlertModal
          title={
            <div>
              나가면 작성하던 내용이 다 지워집니다.
              <br />
              괜찮으신가요?
            </div>
          }
          isOpen={isAlertModalOpen}
          onClose={closeAlertModal}
          handleApprove={resetAndGoHome}
          approveButtonName="나가기"
        />
      )}
    </>
  );
};

export default NewChecklistPage;
