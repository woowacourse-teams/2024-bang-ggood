import styled from '@emotion/styled';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import { DefaultChecklistTabsNames } from '@/constants/tabs';
import { flexCenter, flexColumn } from '@/styles/common';

const TAB_COUNT = DefaultChecklistTabsNames.length;
interface Props {
  marginTop?: string;
  marginBottom?: string;
}
const MoveNextButton = ({ marginTop = '0', marginBottom = '0' }: Props) => {
  const { setCurrentTabId } = useTabContext();

  const handleClick = () => setCurrentTabId(tabId => ((tabId + 2) % TAB_COUNT) - 1);
  return (
    <S.ContentBox marginTop={marginTop} marginBottom={marginBottom}>
      <S.Button onClick={handleClick}>다음 탭으로</S.Button>
    </S.ContentBox>
  );
};

export default MoveNextButton;

const S = {
  Button: styled.button`
    width: 200px;
    margin: 10px 0;
    padding: 10px;

    background-color: ${({ theme }) => theme.palette.grey200};
    border-radius: 10px;

    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
  ContentBox: styled.div<{ marginTop: string; marginBottom: string }>`
    ${flexColumn}
    ${flexCenter}
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.white};
    gap: 0.2rem;
  `,
};
