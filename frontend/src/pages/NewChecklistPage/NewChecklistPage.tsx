import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs, { Menu } from '@/components/common/Tabs/Tabs';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { flexCenter, flexColumn, title2 } from '@/styles/common';

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
    console.log('templateId', templateId);
    setCurrentTemplateId(templateId);
  };

  return (
    <S.Container>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" />}
      />
      <Tabs menuList={menuList} onMoveMenu={onMoveTemplate} currentMenuId={currentTemplateId} />
      {currentTemplateId === 'info' ? <NewChecklistInfoTemplate /> : <NewChecklistTemplate />}
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
