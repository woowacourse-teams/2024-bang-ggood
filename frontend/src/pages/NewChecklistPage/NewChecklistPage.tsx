import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { postChecklist } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs, { Menu } from '@/components/common/Tabs/Tabs';
import useInputs from '@/hooks/useInput';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { flexCenter, flexColumn, title2 } from '@/styles/common';
import { ChecklistFormAnswer } from '@/types/checklist';
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

const DefaultRoomInfo: RoomInfo = {
  roomName: '살기 좋은 방',
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

  const onMoveTemplate = (templateId: TemplateType) => {
    setCurrentTemplateId(templateId);
  };

  /*방 기본 정보 */
  const { values: roomInfo, onChange } = useInputs(DefaultRoomInfo);

  /*선택된 옵션*/
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  /*체크리스트 답변*/
  const [checklistAnswers, setChecklistAnswers] = useState<ChecklistFormAnswer[]>([]);

  //TODO: 프롭스 드릴링 등 나중에 리팩토링 필요 가능성
  const onSubmitChecklist = () => {
    const fetchNewChecklist = async () => {
      await postChecklist({
        room: roomInfo,
        option: selectedOptions,
        questions: checklistAnswers,
      });
    };

    console.log('보내는 데이터', { room: roomInfo, option: selectedOptions, questions: checklistAnswers });

    fetchNewChecklist();
  };

  useEffect(() => {
    console.log('roomInfo', roomInfo);
    console.log('selectedOptions', selectedOptions);
    console.log('checklistAnswers', checklistAnswers);
  }, [roomInfo, selectedOptions, checklistAnswers]);

  return (
    <S.Container>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" onClick={onSubmitChecklist} />}
      />
      <Tabs menuList={menuList} onMoveMenu={onMoveTemplate} currentMenuId={currentTemplateId} />
      {currentTemplateId === 'info' ? (
        <NewChecklistInfoTemplate
          roomInfo={roomInfo}
          onChange={onChange}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      ) : (
        <NewChecklistTemplate answers={checklistAnswers} setAnswers={setChecklistAnswers} />
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
