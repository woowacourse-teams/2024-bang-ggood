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
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.FlexColumn>
      <S.CheckBoxContainer>
        <Checkbox isChecked={isChecked} />
      </S.CheckBoxContainer>
    </S.Container>
  );
};

export default QuestionSelectCard;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    min-height: 40px;
    justify-content: space-between;
    align-items: center;
  `,
  FlexColumn: styled.div`
    display: flex;
    padding: 10px;
    padding-left: 10px;
    flex-direction: column;
    justify-content: space-between;
  `,
  FlexRow: styled.div`
    ${flexCenter}
    gap: 8px;
  `,
  Title: styled.div`
    display: flex;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
    gap: 10px;
  `,
  Subtitle: styled.div`
    padding-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  CheckBoxContainer: styled.div`
    padding: 10px;
  `,
};
