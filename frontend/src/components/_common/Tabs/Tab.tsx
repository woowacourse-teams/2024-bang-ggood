import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

interface TabProps {
  id: number;
  onMoveTab: (id: number) => void;
  name: string;
  active: boolean;
  isCompleted: boolean | null;
}

const Tab = ({ id, onMoveTab, name, active, isCompleted }: TabProps) => {
  return (
    <S.Container key={id} onClick={() => onMoveTab(id)} active={active}>
      {name}
      {!isCompleted && isCompleted !== null && <S.UncompletedIndicator />}
    </S.Container>
  );
};

export default Tab;

const Container = styled.div<{ active: boolean }>`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.TABS};
  ${flexCenter};
  margin-top: 10px;
  padding: 10px 16px;

  color: ${({ theme, active }) => (active ? theme.palette.yellow600 : theme.palette.black)};
  font-weight: ${({ active, theme }) => (active ? theme.text.weight.bold : theme.text.weight.medium)};
  cursor: pointer;
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.palette.yellow400}` : `3px solid ${theme.palette.yellow100}`};
`;

const UncompletedIndicator = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 5px;
  height: 5px;
  margin-left: 8px;

  background-color: ${({ theme }) => theme.palette.grey400};
  border-radius: 50%;
`;

export const S = {
  Container,
  UncompletedIndicator,
};
