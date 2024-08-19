import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

interface TabProps {
  id: number;
  onMoveTab: (id: number) => void;
  name: string;
  active: boolean;
  hasIndicator: boolean | null;
}

const Tab = ({ id, onMoveTab, name, active, hasIndicator }: TabProps) => {
  return (
    <S.Container key={id} onClick={() => onMoveTab(id)} active={active}>
      {name}
      {hasIndicator && hasIndicator !== null && <S.UncompletedIndicator />}
    </S.Container>
  );
};

export default Tab;

const S = {
  Container: styled.div<{ active: boolean }>`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.TABS};
    ${flexCenter};
    margin-top: 10px;
    padding: 10px 16px;

    color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    cursor: pointer;
    border-bottom: ${({ active, theme }) =>
      active ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
  `,
  UncompletedIndicator: styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 5px;
    height: 5px;
    margin-left: 8px;

    background-color: ${({ theme }) => theme.palette.grey400};
    border-radius: 50%;
  `,
};
