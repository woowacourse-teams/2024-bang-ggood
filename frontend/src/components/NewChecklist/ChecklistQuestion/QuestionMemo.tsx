import styled from '@emotion/styled';
import { useRef } from 'react';

import Textarea from '@/components/_common/Textarea/Textarea';
import useInput from '@/hooks/useInput';

interface Props {
  questionId: number;
  text: string;
}

const QuestionMemo = ({ text }: Props) => {
  // const { currentTabId } = useTabContext();
  const { onChange, value } = useInput(text);
  // const { updateMemo } = useChecklistGrade();
  const intervalRef = useRef<number | undefined>(undefined);

  // const handleUpdateMemo = () => {
  //   updateMemo({ categoryId: currentTabId, questionId, newMemo: value });
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (intervalRef.current !== undefined) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = window.setTimeout(() => {
      // handleUpdateMemo();
    }, 2000);
  };

  const handleBlur = () => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    // handleUpdateMemo();
  };

  return (
    <S.Container>
      <Textarea height="medium" value={value || ''} onChange={handleInputChange} onBlur={handleBlur} />
    </S.Container>
  );
};

export default QuestionMemo;

const S = {
  Container: styled.div`
    position: relative;
    margin-top: 15px;
  `,
  ButtonBox: styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
  `,
};
