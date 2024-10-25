import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import EditChecklistTab from '@/components/EditChecklist/ChecklistTab/EditChecklistTab';
import ChecklistContent from '@/components/NewChecklist/ChecklistContent';
import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import SubmitModalWithSummary from '@/components/NewChecklist/SubmitModalWithSummary/SubmitModalWithSummary';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useModal from '@/hooks/useModal';
import useRoomInfoNonValidated from '@/hooks/useRoomInfoNonValidated';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';
import roomInfoStore from '@/store/roomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import loadExternalScriptWithCallback from '@/utils/loadScript';

type RouteParams = {
  checklistId: string;
};

const EditChecklistPage = () => {
  const navigate = useNavigate();
  const { checklistId } = useParams() as RouteParams;
  const { data: checklist, isSuccess } = useGetChecklistDetailQuery(checklistId);

  const checklistQuestionActions = useChecklistStore(state => state.actions);

  const { searchSubwayStationsByAddress, set } = useRoomInfoNonValidated();
  const roomInfoActions = useStore(roomInfoStore, state => state.actions);
  const roomInfoUnvalidatedActions = useStore(roomInfoNonValidatedStore, state => state.actions);

  // 한줄평 모달
  const { isModalOpen: isSubmitModalOpen, openModal: summaryModalOpen, closeModal: summaryModalClose } = useModal();

  // 메모 모달
  const { isModalOpen: isMemoModalOpen, openModal: memoModalOpen, closeModal: memoModalClose } = useModal();

  // TODO: action 분리 필요
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);

  const resetAndGoDetailPage = () => {
    roomInfoActions.reset();
    roomInfoUnvalidatedActions.resetAll();
    checklistQuestionActions.reset();
    selectedOptionActions.reset();
    navigate(ROUTE_PATH.checklistOne(Number(checklistId)));
  };

  useEffect(() => {
    const setChecklistDataToStore = async () => {
      if (!isSuccess) return;

      roomInfoActions.setRawValues(checklist.room);
      set('address', checklist.room.address!);
      set('buildingName', checklist.room.buildingName!);
      //TODO: 가까운 지하철은 나중에 api 수정되면 저장

      loadExternalScriptWithCallback('kakaoMap', () => searchSubwayStationsByAddress(checklist.room.address!));

      selectedOptionActions.set(checklist.options.map(option => option.optionId));
      checklistQuestionActions.set(checklist.categories);
    };

    setChecklistDataToStore();
  }, [checklistId, checklist, isSuccess]);

  return (
    <>
      <Header
        left={<Header.Backward onClick={resetAndGoDetailPage} />}
        center={<Header.Text>체크리스트 편집</Header.Text>}
        right={<Button label="저장" size="small" color="dark" onClick={summaryModalOpen} isSquare />}
      />
      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        <ErrorBoundary fallback={<ChecklistTabFallback />}>
          <EditChecklistTab checklistId={checklistId} />
        </ErrorBoundary>
        {checklist && <ChecklistContent />}
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
