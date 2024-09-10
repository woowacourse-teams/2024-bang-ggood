import { useParams } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useModal from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';

type RouteParams = {
  checklistId: string;
};

const EditChecklistPage = () => {
  const { checklistId } = useParams() as RouteParams;
  const { tabs } = useNewChecklistTabs();

  // 한줄평 모달
  const { isModalOpen: isSummaryModalOpen, openModal: summaryModalOpen, closeModal: summaryModalClose } = useModal();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: memoModalOpen, closeModal: memoModalClose } = useModal();

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>체크리스트 편집</Header.Text>}
        right={<Button label="저장" size="small" color="dark" onClick={summaryModalOpen} />}
      />
      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        {/* 체크리스트 작성의 탭 */}
        <Tabs tabList={tabs} />
        {/*체크리스트 콘텐츠 섹션*/}
        <NewChecklistContent />
      </TabProvider>

      {/* 메모 모달 */}
      {isMemoModalOpen ? (
        <MemoModal isModalOpen={isMemoModalOpen} modalClose={memoModalClose} />
      ) : (
        <MemoButton onClick={memoModalOpen} />
      )}

      {/* 한줄평 모달*/}
      {isSummaryModalOpen && (
        <SummaryModal
          isModalOpen={isSummaryModalOpen}
          modalClose={summaryModalClose}
          mutateType="edit"
          checklistId={Number(checklistId)}
        />
      )}
    </>
  );
};

export default EditChecklistPage;
