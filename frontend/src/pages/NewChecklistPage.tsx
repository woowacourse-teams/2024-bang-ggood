import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useChecklistPost from '@/hooks/useChecklistPost';
import useChecklistTemplate from '@/hooks/useInitialChecklist';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';

const NewChecklistPage = () => {
  useChecklistTemplate(); // 체크리스트 질문 가져오기 및 준비

  const { tabs } = useNewChecklistTabs();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, modalOpen: memoModalOpen, modalClose: memoModalClose } = useModalOpen();

  // 한줄평 모달
  const {
    isModalOpen: isSummaryModalOpen,
    modalOpen: summaryModalOpen,
    modalClose: summaryModalClose,
  } = useModalOpen();

  // 체크리스트 POST
  const { handleSubmitChecklist } = useChecklistPost(summaryModalClose);

  return (
    <>
      <Header
        left={<Header.Backward />}
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
        <SummaryModal
          isModalOpen={isSummaryModalOpen}
          modalClose={summaryModalClose}
          submitChecklist={handleSubmitChecklist}
        />
      )}
    </>
  );
};

export default NewChecklistPage;
