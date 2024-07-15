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
  // console.log(mockMenuList);
  // console.log(menuList);
  //현재 선택된 라우터
  // const [currentIdx, setCurrentIdx] = useState(0);

  const [selectedId, setSelectedId] = useState(0);

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
            />
          );
        })}
      </S.FlexContainer>
    </S.Container>
  );
};

export default Tab;

//flexCenter
export const S = {
  Container: styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 100px;

    background-color: yellow;

    color: black;
    flex-direction: column;
  `,
  FlexContainer: styled.div`
    ${flexCenter}
  `,
  OneMenu: styled.div<{ selected?: boolean }>`
    width: 33%;
    height: 34px;
    padding-top: 10px;

    font-weight: ${({ selected }) => (selected ? '600' : '400')};
    border-top: ${({ selected, theme }) =>
      selected ? `3px solid ${theme.palette.yellow500}` : `2px solid ${theme.palette.grey500}`};
  `,
};
