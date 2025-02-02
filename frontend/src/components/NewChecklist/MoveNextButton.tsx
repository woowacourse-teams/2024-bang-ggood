import styled from '@emotion/styled';
import React from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';
import { flexRow } from '@/styles/common';

interface Props {
  marginTop?: string;
  marginBottom?: string;
}

const MoveNextButton = ({ marginTop = '0', marginBottom = '0' }: Props) => {
  const { setCurrentTabId, currentTabId } = useTabContext();
  const categories = useChecklistStore().categories ?? [];

  const { getNextTab, getPrevTab } = useTabs();

  const handleClickPrev = () => setCurrentTabId(getPrevTab({ currentTabId, categories }));
  const handleClickNext = () => setCurrentTabId(getNextTab({ currentTabId, categories }));

  return (
    <S.ContentBox marginTop={marginTop} marginBottom={marginBottom}>
      <S.Button onClick={handleClickPrev} disabled={currentTabId === -1}>
        {`< 이전으로 이동`}
      </S.Button>
      <S.Button onClick={handleClickNext} disabled={currentTabId === categories.length}>
        {'다음으로 이동 >'}
      </S.Button>
    </S.ContentBox>
  );
};

export default React.memo(MoveNextButton);

const S = {
  Button: styled.button`
    margin: 10px 0;
    padding: 0 15px;
    border: 0.25rem solid ${({ theme }) => theme.palette.yellow400};

    background-color: ${({ theme }) => theme.palette.white};

    color: ${({ theme }) => theme.palette.yellow600};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2.5;
    border-radius: 3rem;

    &:disabled {
      border: 0.25rem solid ${({ theme }) => theme.palette.grey300};

      color: ${({ theme }) => theme.palette.grey500};
    }
  `,
  ContentBox: styled.div<{ marginTop: string; marginBottom: string }>`
    ${flexRow}
    justify-content: space-around;
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
    border-radius: 0.8rem;
  `,
};
