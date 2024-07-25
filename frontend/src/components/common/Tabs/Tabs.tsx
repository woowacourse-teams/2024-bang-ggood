import styled from '@emotion/styled';
import { useState } from 'react';

import { flexCenter } from '@/styles/common';

interface Menu {
  name: string;
  path: string;
}

const Tabs = ({ menuList }: { menuList: Menu[] }) => {
  const [selectedId, setSelectedId] = useState(0);

  const onClickMenu = (id: number) => {
    setSelectedId(id);
  };

  return (
    <S.Container>
      <S.FlexContainer>
        {menuList?.map((menu, index) => {
          return (
            <S.OneMenu key={index} onClick={() => onClickMenu(index)} selected={index === selectedId}>
              <div>{menu.name}</div>
            </S.OneMenu>
          );
        })}
      </S.FlexContainer>
    </S.Container>
  );
};

export default Tabs;

export const S = {
  Container: styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 60px;

    flex-direction: column;
  `,
  FlexContainer: styled.div`
    display: flex;
  `,
  OneMenu: styled.div<{ selected?: boolean }>`
    width: 33%;
    height: 60px;

    ${flexCenter}

    font-weight: ${({ selected, theme }) => (selected ? theme.text.weight.bold : theme.text.weight.medium)};
    border-bottom: ${({ selected, theme }) =>
      selected ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
  `,
};
