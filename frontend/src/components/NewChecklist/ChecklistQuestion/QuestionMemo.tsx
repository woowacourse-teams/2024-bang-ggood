import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import Textarea from '@/components/common/Textarea/Textarea';

interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const QuestionMemo = ({ text, onChange }: Props) => {
  return (
    <S.Container>
      <Textarea height="medium" value={text} onChange={onChange} />
      <S.ButtonBox>
        <Button label="저장" size="xSmall" isSquare={true} color="dark" />
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
