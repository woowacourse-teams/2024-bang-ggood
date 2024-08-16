import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { getChecklistQuestions } from '@/apis/checklist';
import { Memo } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import SummaryModal from '@/components/NewChecklist/SummaryModal/SummaryModal';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useAddChecklistQuery from '@/hooks/query/useAddChecklistQuery';
import useHandleTipBox from '@/hooks/useHandleTipBox';
import useModalOpen from '@/hooks/useModalOpen';
import useNewChecklistTabs from '@/hooks/useNewChecklistTabs';
import useToast from '@/hooks/useToast';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { ChecklistCategoryQnA } from '@/types/checklist';

const NewChecklistPage = () => {
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);
  const { tabs } = useNewChecklistTabs();
  const { mutate: addChecklist } = useAddChecklistQuery();

  /*방 기본 정보 */
  const { value: roomInfoAnswer, actions } = useStore(checklistRoomInfoStore);

  const navigate = useNavigate();

  /*선택된 옵션*/
  const { selectedOptions, resetToDefaultOptions } = useOptionStore();

  /*체크리스트 답변*/
  const { checklistCategoryQnA, setAnswerInQuestion, setValidCategory } = useChecklistStore();

  /*한줄평 모달*/
  const {
    isModalOpen: isSummaryModalOpen,
    modalOpen: summaryModalOpen,
    modalClose: summaryModalClose,
  } = useModalOpen();

  /*메모 모달*/
  const { isModalOpen: isMemoModalOpen, modalOpen: memoModalOpen, modalClose: memoModalClose } = useModalOpen();

  const { resetShowTipBox } = useHandleTipBox('OPTION');

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();

      // 체크리스트 질문에 대한 답안지 객체 생성
      setAnswerInQuestion(checklist);

      // 현재 질문이 있는 유효한 카테고리 생성
      setValidCategory();

      // 옵션 선택지 리셋
      resetToDefaultOptions();

      //로컬 스토리지 팁 보이는 여부 리셋
      resetShowTipBox();
    };

    fetchChecklist();
  }, []);

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
            summaryModalClose();
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
        right={<Button label={'저장'} size="small" color="dark" onClick={summaryModalOpen} />}
      />
      <TabProvider defaultTab={-1}>
        {/* 체크리스트 작성의 탭 */}
        <Tabs tabList={tabs} />
        {/* 체크리스트 콘텐츠 섹션 */}
        <NewChecklistContent />
        {/* 메모 모달 */}
        {isMemoModalOpen && (
          <>
            {/* 모달이 열렸을 때 컨텐츠를 다 보이게 하려는 빈 박스 */}
            <S.EmptyBox />
            <MemoModal isModalOpen={isMemoModalOpen} modalClose={memoModalClose} />
            {/* 메모 작성 버튼 */}
            <FloatingButton position="bottom" onClick={memoModalOpen} size="extends">
              <Memo />
              <span>메모</span>
            </FloatingButton>
          </>
        )}
      </TabProvider>
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

const S = {
  EmptyBox: styled.div`
    width: 100%;
    height: 50px;

    background-color: pink;
  `,
};

export default NewChecklistPage;
