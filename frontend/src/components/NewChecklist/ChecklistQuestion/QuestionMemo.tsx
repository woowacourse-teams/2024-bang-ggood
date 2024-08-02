import styled from '@emotion/styled';
import { useState } from 'react';

import { ArrowUpSmall, MemoEmpty, MemoFilled } from '@/assets/assets';
import Textarea from '@/components/common/Textarea/Textarea';
import { flexCenter } from '@/styles/common';

interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const QuestionMemo = ({ text, onChange }: Props) => {
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const handleCloseMemo = () => {
    setIsMemoOpen(false);
  };

  const handleOpenMemo = () => {
    setIsMemoOpen(true);
  };

  return (
    <>
      <S.ButtonBox>
        {isMemoOpen ? (
          <ArrowUpSmall onClick={handleCloseMemo} />
        ) : text.length ? (
          <MemoFilled onClick={handleOpenMemo} />
        ) : (
          <MemoEmpty onClick={handleOpenMemo} />
        )}
      </S.ButtonBox>
      <Textarea height="medium" value={text} onChange={onChange} />
    </>
  );
};

export default QuestionMemo;

const S = {
  ButtonBox: styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    ${flexCenter}

    :hover {
      background-color: ${({ theme }) => theme.palette.background};
    }
  `,
};
