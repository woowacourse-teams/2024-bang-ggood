import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Header from '@/components/_common/Header/Header';
import AlertModal from '@/components/_common/Modal/AlertModal/AlertModal';
import LoginModal from '@/components/_common/Modal/LoginModal/LoginModal';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import ChecklistContent from '@/components/NewChecklist/ChecklistContent';
import NewChecklistTab from '@/components/NewChecklist/ChecklistTab/NewChecklistTab';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import SubmitModalWithSummary from '@/components/NewChecklist/SubmitModalWithSummary/SubmitModalWithSummary';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useModal from '@/hooks/useModal';
import useResetChecklist from '@/hooks/useResetChecklist';
import { trackNotCompleteChecklist, trackSaveChecklist } from '@/service/amplitude/trackEvent';

const NewChecklistPage = () => {
  const navigate = useNavigate();
  const { resetChecklist } = useResetChecklist();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: openMemoModal, closeModal: closeMemoModal } = useModal();
  // 한줄평 모달
  const { isModalOpen: isSubmitModalOpen, openModal: openSummaryModal, closeModal: closeSummaryModal } = useModal();
  // 뒤로가기 시 휘발 경고 모달
  const { isModalOpen: isAlertModalOpen, openModal: openAlertModal, closeModal: closeAlertModal } = useModal();
  // 로그인 요청 모달
  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();

  const handleSaveChecklistButton = () => {
    openSummaryModal();
    trackSaveChecklist();
  };

  const handleNotCompleteChecklist = () => {
    trackNotCompleteChecklist();
    resetChecklist();
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={openAlertModal} />}
        center={<Header.Text>새 체크리스트</Header.Text>}
        right={<Button label="저장" size="small" color="primary" onClick={handleSaveChecklistButton} isSquare />}
      />

      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        <ErrorBoundary fallback={<ChecklistTabFallback />}>
          <NewChecklistTab />
        </ErrorBoundary>

        <ChecklistContent />
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
        handleApprove={handleNotCompleteChecklist}
        approveButtonName="나가기"
      />

      <LoginModal isModalOpen={isLoginModalOpen} modalClose={closeLoginModal} />
    </>
  );
};

export default NewChecklistPage;
