import styled from '@emotion/styled';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import { DefaultChecklistTabsNames } from '@/constants/tabs';
import { flexRow } from '@/styles/common';

const TAB_COUNT = DefaultChecklistTabsNames.length;
interface Props {
  marginTop?: string;
  marginBottom?: string;
}
const MoveNextButton = ({ marginTop = '0', marginBottom = '0' }: Props) => {
  const { setCurrentTabId } = useTabContext();

  const handleClickPrev = () => setCurrentTabId(tabId => (tabId % TAB_COUNT) - 1);
  const handleClickNext = () => setCurrentTabId(tabId => ((tabId + 2) % TAB_COUNT) - 1);
  return (
    <S.ContentBox marginTop={marginTop} marginBottom={marginBottom}>
      <S.Button onClick={handleClickPrev}>
        <S.Text color="red">{'< '}</S.Text>
        {'이전으로 이동'}
      </S.Button>
      <S.Button onClick={handleClickNext}>
        {'다음으로 이동'}
        <S.Text color="red">{' >'}</S.Text>
      </S.Button>
    </S.ContentBox>
  );
};

export default MoveNextButton;

const S = {
  Text: styled.span<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
  Button: styled.button`
    margin: 10px 0;
    padding: 0 15px;

    background-color: ${({ theme }) => theme.palette.grey200};

    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2.5;
    border-radius: 10px;
  `,
  ContentBox: styled.div<{ marginTop: string; marginBottom: string }>`
    ${flexRow}
    justify-content: space-around;
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
    border-radius: 0.8rem;
  `,
};
