import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import AlertModal from '@/components/_common/Modal/AlertModal/AlertModal';
import LoginModal from '@/components/_common/Modal/LoginModal/LoginModal';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SubmitModalWithSummary from '@/components/NewChecklist/SubmitModalWithSummary/SubmitModalWithSummary';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useChecklistTabs from '@/hooks/useChecklistTabs';
import useHandleTip from '@/hooks/useHandleTip';
import useModal from '@/hooks/useModal';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';

const NewChecklistPage = () => {
  const { tabs } = useChecklistTabs();
  const navigate = useNavigate();

  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomInfoNonValidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);
  const checklistActions = useChecklistStore(state => state.actions);
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);
  const { resetShowTip } = useHandleTip('OPTION');

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: openMemoModal, closeModal: closeMemoModal } = useModal();

  // 한줄평 모달
  const { isModalOpen: isSubmitModalOpen, openModal: openSummaryModal, closeModal: closeSummaryModal } = useModal();

  // 뒤로가기 시 휘발 경고 모달
  const { isModalOpen: isAlertModalOpen, openModal: openAlertModal, closeModal: closeAlertModal } = useModal();

  // 로그인 요청 모달
  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();

  const resetChecklist = () => {
    roomInfoActions.resetAll();
    roomInfoNonValidatedActions.resetAll();
    checklistActions.reset();
    selectedOptionActions.reset();
    resetShowTip();
  };

  const handleChecklistPage = () => {
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
      <SubmitModalWithSummary
        isModalOpen={isSubmitModalOpen}
        modalClose={closeSummaryModal}
        onConfirm={resetChecklist}
        onError={openLoginModal}
        mutateType="add"
      />
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
        handleApprove={handleChecklistPage}
        approveButtonName="나가기"
      />
      <LoginModal isModalOpen={isLoginModalOpen} modalClose={closeLoginModal} />
    </>
  );
};

export default NewChecklistPage;
