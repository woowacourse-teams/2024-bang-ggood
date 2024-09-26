import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SubmitModalWithSummary from '@/components/NewChecklist/SubmitModalWithSummary/SubmitModalWithSummary';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useModal from '@/hooks/useModal';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import roomInfoUnvalidatedStore from '@/store/roomInfoUnvalidatedStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';

type RouteParams = {
  checklistId: string;
};

const EditChecklistPage = () => {
  const navigate = useNavigate();
  const { checklistId } = useParams() as RouteParams;
  const { data: checklist, isSuccess } = useGetChecklistDetailQuery(checklistId);
  const { tabs } = useNewChecklistTabs();
  const checklistActions = useChecklistStore(state => state.actions);

  const roomInfoActions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomInfoUnvalidatedActions = useStore(roomInfoUnvalidatedStore, state => state.actions);

  // 한줄평 모달
  const { isModalOpen: isSubmitModalOpen, openModal: summaryModalOpen, closeModal: summaryModalClose } = useModal();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: memoModalOpen, closeModal: memoModalClose } = useModal();

  // TODO: action 분리 필요
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);

  const resetAndGoDetailPage = () => {
    roomInfoActions.resetAll();
    roomInfoUnvalidatedActions.resetAll();
    checklistActions.reset();
    selectedOptionActions.reset();
    navigate(ROUTE_PATH.checklistOne(Number(checklistId)));
  };

  useEffect(() => {
    const setChecklistDataToStore = async () => {
      if (!isSuccess) return;

      roomInfoActions.setAll({
        rawValue: checklist.room,
        value: checklist.room,
      });

      roomInfoUnvalidatedActions.set('address', checklist.room.address!);
      roomInfoUnvalidatedActions.set('buildingName', checklist.room.buildingName!);
      //TODO: 가까운 지하철은 나중에 api 수정되면 저장

      selectedOptionActions.set(checklist.options.map(option => option.optionId));
      checklistActions.set(checklist.categories);
    };

    setChecklistDataToStore();
  }, [checklistId]);

  return (
    <>
      <Header
        left={<Header.Backward onClick={resetAndGoDetailPage} />}
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

      <SubmitModalWithSummary
        isModalOpen={isSubmitModalOpen}
        onConfirm={resetAndGoDetailPage}
        modalClose={summaryModalClose}
        mutateType="edit"
        checklistId={Number(checklistId)}
      />
    </>
  );
};

export default EditChecklistPage;
