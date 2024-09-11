import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import AlertModal from '@/components/_common/AlertModal/AlertModal';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useChecklistTemplate from '@/hooks/useInitialChecklist';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const NewChecklistPage = () => {
  useChecklistTemplate(); // 체크리스트 질문 가져오기 및 준비
  const navigate = useNavigate();

  const { tabs } = useNewChecklistTabs();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, modalOpen: memoModalOpen, modalClose: memoModalClose } = useModalOpen();

  // 한줄평 모달
  const {
    isModalOpen: isSummaryModalOpen,
    modalOpen: summaryModalOpen,
    modalClose: summaryModalClose,
  } = useModalOpen();

  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  // const addressActions = useStore(checklistAddressStore);

  //뒤로가기 내용 삭제 경고 모달
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const handleNavigateBack = () => {
    actions.resetAll();
    // addressActions.reset();
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      {isModalOpen && (
        <AlertModal
          title={
            <div>
              나가면 작성하던 내용이 다 지워집니다.
              <br />
              괜찮으신가요?
            </div>
          }
          isOpen={isModalOpen}
          onClose={modalClose}
          handleApprove={handleNavigateBack}
          approveButtonName="나가기"
        />
      )}
      <Header
        left={<Header.Backward onClick={modalOpen} />}
        center={<Header.Text>새 체크리스트</Header.Text>}
        right={<Button label="저장" size="xSmall" color="dark" onClick={summaryModalOpen} />}
      />
      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        <Tabs tabList={tabs} />
        <NewChecklistContent />
      </TabProvider>

      {isMemoModalOpen ? (
        <MemoModal isModalOpen={isMemoModalOpen} modalClose={memoModalClose} />
      ) : (
        <MemoButton onClick={memoModalOpen} />
      )}

      {isSummaryModalOpen && (
        <SummaryModal isModalOpen={isSummaryModalOpen} modalClose={summaryModalClose} mutateType="add" />
      )}
    </>
  );
};

export default NewChecklistPage;
