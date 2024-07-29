import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postChecklist } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { TabProvider } from '@/components/common/Tabs/TabContext';
import { Tab } from '@/components/common/Tabs/Tabs';
import { useToastContext } from '@/components/common/Toast/ToastContext';
import { ROUTE_PATH } from '@/constants/routePath';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import useInputs from '@/hooks/useInput';
import NewChecklistBody from '@/pages/NewChecklistPage/NewChecklistBody';
import { flexCenter, flexColumn, title2 } from '@/styles/common';
import { ChecklistFormAfterAnswer } from '@/types/checklist';
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

export const newChecklistTabs: Tab[] = [
  { id: 0, name: '기본 정보' },
  {
    id: 1,
    name: '청결',
  },
  {
    id: 2,
    name: '방 컨디션',
  },
  {
    id: 3,
    name: '편의시설',
  },
  {
    id: 4,
    name: '옵션',
  },
  {
    id: 5,
    name: '주거환경',
  },
  {
    id: 6,
    name: '보안',
  },
  {
    id: 7,
    name: '경제적',
  },
];

const NewChecklistPage = () => {
  const { showToast } = useToastContext();

  /*방 기본 정보 */
  const { values: roomInfo, onChange } = useInputs(DefaultRoomInfo);

  /*선택된 옵션*/
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  /*체크리스트 답변*/

  const { addAnswer, deleteAnswer, questionSelectedAnswer, checklistAnswers } = useChecklistAnswer();

  const navigate = useNavigate();

  //TODO: 프롭스 드릴링 등 나중에 리팩토링 필요 가능성
  const onSubmitChecklist = () => {
    const emotionAnswers: ChecklistFormAfterAnswer[] = checklistAnswers.map(question => {
      if (question.answer === 1) return { ...question, answer: 'BAD' };
      if (question.answer === 2) return { ...question, answer: 'SOSO' };
      return { ...question, answer: 'GOOD' };
    });

    const fetchNewChecklist = async () => {
      await postChecklist({
        room: roomInfo,
        options: selectedOptions,
        questions: emotionAnswers,
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

  return (
    <S.Container>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" color="dark" onClick={onSubmitChecklist} />}
      />

      <TabProvider>
        <NewChecklistBody
          newChecklistTabs={newChecklistTabs}
          roomInfo={roomInfo}
          onChange={onChange}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          addAnswer={addAnswer}
          deleteAnswer={deleteAnswer}
          questionSelectedAnswer={questionSelectedAnswer}
          checklistAnswers={checklistAnswers}
        />
      </TabProvider>
    </S.Container>
  );
};

export default NewChecklistPage;

const Container = styled.div`
  ${flexColumn}
`;

const Title = styled.div`
  ${title2}
  ${flexCenter}
`;

const S = {
  Container,
  Title,
};
