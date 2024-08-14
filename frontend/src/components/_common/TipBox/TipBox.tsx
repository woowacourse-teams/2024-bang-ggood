import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { CloseIcon } from '@/assets/assets';
import { STORAGE_KEYS } from '@/constants/localStorage';
import { flexCenter, title4 } from '@/styles/common';

interface Props {
  tipText: string;
}

const TipBox = ({ tipText }: Props) => {
  const [isTipOpen, setIsTipOpen] = useState(() => {
    const savedTipState = localStorage.getItem(STORAGE_KEYS.TIP);
    return savedTipState !== null ? JSON.parse(savedTipState) : true;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIP, JSON.stringify(isTipOpen));
  }, [isTipOpen]);

  return (
    <S.TipBox>
      <S.TipText>
        💡 <S.Bold>TIP</S.Bold> : {tipText}
      </S.TipText>
      <CloseIcon onClick={() => setIsTipOpen(false)} style={{ paddingRight: 10 }} />
    </S.TipBox>
  );
};

const S = {
  TipBox: styled.div`
    width: 100%;
    margin-top: 10px;
    ${flexCenter}
    justify-content: space-between;

    background-color: white;

    font-size: 14px;
    line-height: 1.3;
    border-radius: 10px;
  `,
  TipText: styled.div`
    padding: 12px;
  `,
  Bold: styled.span`
    ${title4}
  `,
};

export default TipBox;
