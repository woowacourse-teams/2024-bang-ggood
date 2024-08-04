import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import Textarea from '@/components/common/Textarea/Textarea';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import useInput from '@/hooks/useInput';

interface Props {
  questionId: number;
  text: string;
}
const QuestionMemo = ({ questionId, text }: Props) => {
  const { currentTabId } = useTabContext();
  const { onChange, value } = useInput(text);
  const { updateMemo } = useChecklistAnswer();

  const handleUpdateMemo = () => {
    updateMemo({ categoryId: currentTabId, questionId, newMemo: value });
  };

  return (
    <S.Container>
      <Textarea height="medium" value={value || ''} onChange={onChange} />
      <S.ButtonBox>
        <Button label="저장" size="xSmall" isSquare={true} color="dark" onClick={handleUpdateMemo} />
      </S.ButtonBox>
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
