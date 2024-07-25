import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

interface Props {
  menuList: Menu[];
  onMoveMenu: (menu: string) => void;
  currentMenuId: string;
}

export type Menu = {
  name: string;
  id: string;
};

const Tabs = ({ menuList, onMoveMenu, currentMenuId }: Props) => {
  return (
    <S.Container>
      <S.FlexContainer>
        {menuList?.map((menu, index) => {
          return (
            <S.OneMenu
              menuCount={menuList.length}
              key={index}
              onClick={() => onMoveMenu(menu.id)}
              selected={menu.id === currentMenuId}
            >
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
  OneMenu: styled.div<{ selected?: boolean; menuCount: number }>`
    width: ${({ menuCount }) => `calc(100% / ${menuCount})`};
    height: 60px;

    ${flexCenter}

    font-weight: ${({ selected, theme }) => (selected ? theme.text.weight.bold : theme.text.weight.medium)};
    border-bottom: ${({ selected, theme }) =>
      selected ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
  `,
};
