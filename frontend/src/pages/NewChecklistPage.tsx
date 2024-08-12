import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { getChecklistQuestions, postChecklist } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import NewChecklistTab from '@/components/NewChecklist/NewChecklistTab';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter, title2 } from '@/styles/common';
import { ChecklistCategoryQnA } from '@/types/checklist';

const NewChecklistPage = () => {
  const { showToast } = useToast(3);

  //TODO:  방 기본 정보도 전역 상태로 관리 필요
  /*방 기본 정보 */
  const { roomInfo } = useStore(checklistRoomInfoStore);
  // const { values: roomInfo, onChange: onChangeRoomInfo, setValues: setRoomInfo } = useInputs(DefaultRoomInfo);

  /*선택된 옵션*/
  const { selectedOptions } = useOptionStore();

  /*체크리스트 답변*/
  const { setAnswerInQuestion, checklistCategoryQnA, setValidCategory } = useChecklistStore();

  const navigate = useNavigate();

  /*현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수*/
  const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
    return checklist.flatMap(category =>
      category.questions.map(question => {
        const { questionId, memo, grade } = question;
        return {
          questionId,
          memo,
          grade,
        };
      }),
    );
  };

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = async () => {
      await postChecklist({
        room: roomInfo,
        options: selectedOptions,
        questions: transformQuestions(checklistCategoryQnA),
      });
    };

    try {
      fetchNewChecklist();
      showToast('체크리스트가 저장되었습니다.');
      navigate(ROUTE_PATH.checklistList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();

      /*체크리스트 질문에 대한 답안지 객체 생성 */
      setAnswerInQuestion(checklist);
      /*현재 질문이 있는 유효한 카테고리 생성*/
      setValidCategory();
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />
      <TabProvider defaultTab={0}>
        {/*체크리스트 작성의 탭*/}
        <NewChecklistTab />
        {/*체크리스트 콘텐츠 섹션*/}
        <NewChecklistContent />
      </TabProvider>
    </>
  );
};

export default NewChecklistPage;

const Title = styled.div`
  ${title2}
  ${flexCenter}
`;

const S = {
  Title,
};
