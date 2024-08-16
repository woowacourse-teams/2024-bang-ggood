import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'zustand';

import { getChecklistDetail } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import useToast from '@/hooks/useToast';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { ChecklistCategoryQnA } from '@/types/checklist';

type RouteParams = {
  checklistId: string;
};
const EditChecklistPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const { mutate: addChecklist } = useAddChecklistQuery();
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);
  const { checklistId } = useParams() as RouteParams;
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const roomName = useStore(checklistRoomInfoStore, state => state.value.roomName);

  const navigate = useNavigate();

  const { tabs } = useNewChecklistTabs();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistDetail(Number(checklistId));
      actions.setAll({ value: checklist.room });
    };
    fetchChecklist();
  }, [checklistId, actions]);

  // TODO: fetch 시 로딩 상태일 때 스켈레톤처리. 성공할 떄만 return 문 보여주는 로직이 필요
  if (!roomName) {
    return <div>체크리스트가 없어요</div>;
  }

  /* 현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수 */
  const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
    return checklist.flatMap(category =>
      category.questions.map(question => {
        const { questionId, answer } = question;
        return {
          questionId,
          answer,
        };
      }),
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
            showToast('체크리스트가 저장되었습니다.');
            actions.reset();
            navigate(ROUTE_PATH.checklistList);
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
        center={<Header.Text>{'새 체크리스트'}</Header.Text>}
        right={<Button label={'저장'} size="small" color="dark" onClick={modalOpen} />}
      />
      <TabProvider defaultTab={-1}>
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
