import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import useChecklistPost from '@/hooks/useChecklistPost';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';

const NewChecklistPage = () => {
  const { tabs } = useNewChecklistTabs();
  // 메모 모달
  const { isModalOpen: isMemoModalOpen, modalOpen: memoModalOpen, modalClose: memoModalClose } = useModalOpen();
  // 한줄평 모달
  const {
    isModalOpen: isSummaryModalOpen,
    modalOpen: summaryModalOpen,
    modalClose: summaryModalClose,
  } = useModalOpen();
  const { handleSubmitChecklist } = useChecklistPost(summaryModalClose);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{'새 체크리스트'}</Header.Text>}
        right={<Button label={'저장'} size="small" color="dark" onClick={summaryModalOpen} />}
      />
      <TabProvider defaultTab={-1}>
        {/* 체크리스트 작성의 탭 */}
        <Tabs tabList={tabs} />

        {/* 체크리스트 콘텐츠 섹션 */}
        <NewChecklistContent />
      </TabProvider>

      {/* 메모 모달 */}
      {isMemoModalOpen ? (
        <MemoModal isModalOpen={isMemoModalOpen} modalClose={memoModalClose} />
      ) : (
        <MemoButton onClick={memoModalOpen} />
      )}

      {/* 한줄평 모달 */}
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
