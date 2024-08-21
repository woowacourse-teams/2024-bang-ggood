import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_CHECKLIST_TAB_PAGE } from '@/constants/system';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import useToast from '@/hooks/useToast';
import checklistIncludedMaintenancesStore from '@/store/checklistIncludedMaintenancesStore';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { ChecklistCategoryQnA } from '@/types/checklist';
import { objectOmit } from '@/utils/typeFunctions';

type RouteParams = {
  checklistId: string;
};
const EditChecklistPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();
  const { showToast } = useToast();

  const { checklistId } = useParams() as RouteParams;
  const navigate = useNavigate();

  const { data: checklist, isSuccess } = useGetChecklistDetailQuery(checklistId);
  const { mutate: addChecklist } = useAddChecklistQuery();
  /* roomInfo */
  const roomInfoAnswer = useStore(checklistRoomInfoStore, state => state.value);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.value.roomName);
  const IncludedMaintenancesActions = useStore(checklistIncludedMaintenancesStore, state => state.actions);

  /* option */
  const { selectedOptions, setSelectedOptions } = useOptionStore();
  /* checklist */
  const { checklistCategoryQnA, setAnswers } = useChecklistStore();

  const { tabs } = useNewChecklistTabs();

  useEffect(() => {
    const fetchChecklistAndSetToStore = async () => {
      if (!isSuccess) return;

      actions.setAll({ rawValue: objectOmit(checklist.room, new Set('includedMaintenances')), value: checklist.room });
      IncludedMaintenancesActions.set(checklist.room.includedMaintenances ?? []);
      setSelectedOptions(checklist.options.flatMap(option => option.optionId));

      setAnswers(checklist.categories);
    };
    fetchChecklistAndSetToStore();
  }, [checklistId]);
  // TODO: fetch 시 로딩 상태일 때 스켈레톤처리. 성공할 떄만 return 문 보여주는 로직이 필요
  if (!roomName) {
    return <div>체크리스트가 없어요</div>;
  }

  /* 현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수 */
  const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
    return checklist.flatMap(category =>
      category.questions.map(question => ({
        questionId: question.questionId,
        answer: question.answer,
      })),
    );
  };

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = () => {
      addChecklist(
        {
          room: roomInfoAnswer,
          options: selectedOptions,
          questions: transformQuestions(checklistCategoryQnA),
        },
        {
          onSuccess: () => {
            modalClose();
            showToast('체크리스트가 수정되었습니다.');
            actions.resetAll();
            navigate(ROUTE_PATH.checklistOne(Number(checklistId)));
          },
        },
      );
    };

    fetchNewChecklist();
  };

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>체크리스트 편집</Header.Text>}
        right={<Button label="저장" size="small" color="dark" onClick={modalOpen} />}
      />
      <TabProvider defaultTab={DEFAULT_CHECKLIST_TAB_PAGE}>
        {/* 체크리스트 작성의 탭 */}
        <Tabs tabList={tabs} />
        {/*체크리스트 콘텐츠 섹션*/}
        <NewChecklistContent />
      </TabProvider>

      {/* 한줄평 모달*/}
      {isModalOpen && (
        <SummaryModal isModalOpen={isModalOpen} modalClose={modalClose} submitChecklist={handleSubmitChecklist} />
      )}
    </>
  );
};

export default EditChecklistPage;
