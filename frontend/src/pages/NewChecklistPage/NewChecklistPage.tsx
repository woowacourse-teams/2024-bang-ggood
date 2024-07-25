import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs, { Menu } from '@/components/common/Tabs/Tabs';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { flexCenter, flexColumn, title2 } from '@/styles/common';
import { ChecklistFormAnswer } from '@/types/checklist';

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

const NewChecklistPage = () => {
  const [currentTemplateId, setCurrentTemplateId] = useState<string>(menuList[0].id);

  const onMoveTemplate = (templateId: TemplateType) => {
    setCurrentTemplateId(templateId);
  };

  /*선택된 옵션*/
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  /*체크리스트 답변*/
  const [checklistAnswers, setChecklistAnswers] = useState<ChecklistFormAnswer[]>([]);

  //TODO: 프롭스 드릴링 등 나중에 리팩토링 필요 가능성
  // const [newChecklist, setNewChecklist] = useState<ChecklistForm>({
  //   room: RoomInfo;
  //   option: number[];
  //   questions: ChecklistFormAnswer[];
  // });

  // const onSubmitChecklist = () => {
  //   const fetchNewChecklist = async () => {
  //     postChecklist();
  //   };
  // };

  return (
    <S.Container>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" />}
      />
      <Tabs menuList={menuList} onMoveMenu={onMoveTemplate} currentMenuId={currentTemplateId} />
      {currentTemplateId === 'info' ? (
        <NewChecklistInfoTemplate selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
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
