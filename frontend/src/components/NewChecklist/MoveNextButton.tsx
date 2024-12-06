import styled from '@emotion/styled';
import React from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  marginTop?: string;
  marginBottom?: string;
  tabCount: number;
}

//TODO: 탭은 무조건 id 가 아니라 인덱스를 써야 한다
const MoveNextButton = ({ marginTop = '0', marginBottom = '0', tabCount }: Props) => {
  //getTabsForChecklist
  //{id: 0 , id: 1, id: 3, id: 5}

  const { setCurrentTabId, currentTabId } = useTabContext();

  const handleClickPrev = () => setCurrentTabId(tabId => (tabId % tabCount) - 1);
  const handleClickNext = () => setCurrentTabId(tabId => ((tabId + 2) % tabCount) - 1);
  return (
    <S.ContentBox marginTop={marginTop} marginBottom={marginBottom}>
      <S.Button onClick={handleClickPrev}>
        <S.Text color={theme.palette.yellow600}>{'< 이전으로 이동'}</S.Text>
      </S.Button>
      <S.Button onClick={handleClickNext}>
        <S.Text color={theme.palette.yellow600}>{'다음으로 이동 >'}</S.Text>
      </S.Button>
    </S.ContentBox>
  );
};

export default React.memo(MoveNextButton);

const S = {
  Text: styled.span<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
  Button: styled.button`
    margin: 10px 0;
    padding: 0 15px;
    border: 0.25rem solid ${({ theme }) => theme.palette.yellow400};

    background-color: ${({ theme }) => theme.palette.white};

    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2.5;
    border-radius: 3rem;
  `,
  ContentBox: styled.div<{ marginTop: string; marginBottom: string }>`
    ${flexRow}
    justify-content: space-around;
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
    border-radius: 0.8rem;
  `,
};
