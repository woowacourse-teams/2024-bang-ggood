import styled from '@emotion/styled';
import React from 'react';

import Button from '@/components/_common/Button/Button';
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
      <Button label="이전으로 이동" onClick={handleClickPrev} disabled={currentTabId === -1} color="light" />
      <Button
        label="다음으로 이동"
        onClick={handleClickNext}
        disabled={currentTabId === categories.length}
        color="primary"
      />
    </S.ContentBox>
  );
};

export default React.memo(MoveNextButton);

const S = {
  ContentBox: styled.div<{ marginTop: string; marginBottom: string }>`
    ${flexRow}
    justify-content: space-around;
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
  `,
};
