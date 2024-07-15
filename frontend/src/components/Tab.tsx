import styled from '@emotion/styled';
import { useState } from 'react';

import { flexCenter } from '@/styles/common';

// interface Menu {
//   name: string;
//   path: string;
//   id: number;
// }

// type Props = {
//   menuList: Menu[];
// };

const mockMenuList = [
  {
    name: '기본 정보',
    path: 'basic-info',
    menu_id: 1,
  },
  {
    name: '체크리스트',
    path: 'checklist',
    menu_id: 2,
  },
  {
    name: '메모 및 사진',
    path: 'extra-info',
    menu_id: 3,
  },
];
const Tab = () => {
  const [selectedId, setSelectedId] = useState(1);

  const onClickMenu = (id: number) => {
    setSelectedId(id);
    // searchParams.set('folderId', String(folderId));
    // setSearchParams(searchParams);
  };

  return (
    <S.Container>
      <S.FlexContainer>
        {mockMenuList.map(menu => {
          return (
            <S.OneMenu
              key={menu.menu_id}
              onClick={() => onClickMenu(menu.menu_id)}
              selected={menu.menu_id === selectedId}
            >
              <div>{menu.name}</div>
            </S.OneMenu>
          );
        })}
      </S.FlexContainer>
    </S.Container>
  );
};

export default Tab;

export const S = {
  Container: styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 50px;

    flex-direction: column;
  `,
  FlexContainer: styled.div`
    ${flexCenter}
  `,
  OneMenu: styled.div<{ selected?: boolean }>`
    width: 33%;
    padding-top: 10px;
    padding-bottom: 15px;
    ${flexCenter}

    font-weight: ${({ selected, theme }) => (selected ? theme.text.weight.bold : theme.text.weight.medium)};
    border-bottom: ${({ selected, theme }) =>
      selected ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
  `,
};
