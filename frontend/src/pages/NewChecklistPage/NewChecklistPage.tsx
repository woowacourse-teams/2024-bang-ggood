import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistQuestions, postChecklist } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { TabProvider } from '@/components/common/Tabs/TabContext';
import { ROUTE_PATH } from '@/constants/routePath';
import { newChecklistTabs } from '@/constants/tabs';
import useInputs from '@/hooks/useInput';
import useToast from '@/hooks/useToast';
import NewChecklistBody from '@/pages/NewChecklistPage/NewChecklistBody';
import useChecklist from '@/store/useChecklist';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter, title2 } from '@/styles/common';
import { ChecklistCategoryQnA } from '@/types/checklist';
import { RoomInfo } from '@/types/room';

// TODO: roomName 이슈로 인해 데모 버전으로 변경
const DefaultRoomInfo: RoomInfo = {
  name: '살기 좋은 방',
  address: '인천광역시 부평구',
  deposit: 2000,
  rent: 50,
  contractTerm: 12,
  floor: 3,
  station: '잠실',
  walkingTime: 10,
  realEstate: '방끗공인중개사',
};

const NewChecklistPage = () => {
  const { showToast } = useToast(3);

  /*방 기본 정보 */
  const { values: roomInfo, onChange } = useInputs(DefaultRoomInfo);

  /*선택된 옵션*/
  const { selectedOptions } = useOptionStore();

  /*체크리스트 답변*/
  const { setAnswerInQuestion, checklistCategoryQnA } = useChecklist();

  const navigate = useNavigate();

  const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
    return checklist.flatMap(category =>
      category.questions.map(question => ({
        questionId: question.questionId,
        answer: null,
      })),
    );
  };

  const onSubmitChecklist = () => {
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
      setTimeout(() => {
        navigate(ROUTE_PATH.checklistList);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();

      /*체크리스트 질문에 대한 답안지 객체 생성 */
      setAnswerInQuestion(checklist);
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" color="dark" onClick={onSubmitChecklist} />}
      />

      <TabProvider>
        <NewChecklistBody newChecklistTabs={newChecklistTabs} roomInfo={roomInfo} onChange={onChange} />
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
