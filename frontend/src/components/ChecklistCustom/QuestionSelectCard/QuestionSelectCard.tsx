import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import { flexCenter } from '@/styles/common';
import { ChecklistQuestionWithIsChecked } from '@/types/checklist';

const QuestionSelectCard = ({ question }: { question: ChecklistQuestionWithIsChecked }) => {
  const { title, subtitle, isChecked } = question;

  return (
    <S.Container>
      <S.FlexColumn>
        <S.FlexRow>
          <QuestionDot />
          <S.Title>{title}</S.Title>
        </S.FlexRow>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.FlexColumn>
      <Checkbox isChecked={isChecked} />
    </S.Container>
  );
};

export default QuestionSelectCard;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
  `,
  FlexColumn: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  FlexRow: styled.div`
    ${flexCenter}
    gap: 5px;
  `,
  Title: styled.div`
    display: flex;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
    gap: 10px;
  `,
  Subtitle: styled.div`
    margin-bottom: 10px;
    padding-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
};
