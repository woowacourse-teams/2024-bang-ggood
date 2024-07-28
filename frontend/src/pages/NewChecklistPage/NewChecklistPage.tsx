import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postChecklist } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs, { Menu } from '@/components/common/Tabs/Tabs';
import { useToastContext } from '@/components/common/Toast/ToastContext';
import { ROUTE_PATH } from '@/constants/routePath';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import useInputs from '@/hooks/useInput';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { flexCenter, flexColumn, title2 } from '@/styles/common';
import { ChecklistFormAfterAnswer } from '@/types/checklist';
import { RoomInfo } from '@/types/room';

export type TemplateType = 'checklist' | 'info';

const menuList: Menu[] = [
  {
    name: '기본 정보',
    id: 'info',
  },
  {
    name: '체크리스트',
    id: 'checklist',
  },
];

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
  const [currentTemplateId, setCurrentTemplateId] = useState<string>(menuList[0].id);
  // const [isToastShow, setIsToastShow] = useState(false);
  const { showToast } = useToastContext();

  const onMoveTemplate = (templateId: TemplateType) => {
    setCurrentTemplateId(templateId);
  };

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
      // showToast('체크리스트가 저장되었습니다.');
      // setIsToastShow(true);
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
      <button onClick={() => showToast('체크리스트가 저장되었습니다.')}>토스트22</button>
      <Tabs menuList={menuList} onMoveMenu={onMoveTemplate} currentMenuId={currentTemplateId} />

      {currentTemplateId === 'info' ? (
        <NewChecklistInfoTemplate
          roomInfo={roomInfo}
          onChange={onChange}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      ) : (
        <NewChecklistTemplate
          answers={checklistAnswers}
          addAnswer={addAnswer}
          deleteAnswer={deleteAnswer}
          questionSelectedAnswer={questionSelectedAnswer}
        />
      )}
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
