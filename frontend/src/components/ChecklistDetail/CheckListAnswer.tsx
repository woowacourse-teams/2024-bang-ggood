import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/_common/FaceMark/FaceMark';
import { EMOTION_PHRASE } from '@/constants/emotion';
import { flexSpaceBetween } from '@/styles/common';
import { ChecklistQuestionWithAnswer } from '@/types/checklist';

interface Props {
  QuestionAndAnswer: ChecklistQuestionWithAnswer;
}

const ChecklistAnswer = ({ QuestionAndAnswer }: Props) => {
  const { title, subtitle, grade } = QuestionAndAnswer;

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>
          <QuestionDot />
          {title}
        </S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleContainer>
      <S.AnswerContainer>
        <FaceMark>
          <FaceMark.FaceIcon emotion={grade} isFilled={true} />
          <FaceMark.Footer>{EMOTION_PHRASE[grade]}</FaceMark.Footer>
        </FaceMark>
      </S.AnswerContainer>
    </S.Container>
  );
};

export default ChecklistAnswer;

const S = {
  Container: styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 16px;
    gap: 10px;

    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    margin: 5px 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5rem;
    align-items: baseline;

    gap: 10px;
  `,
  Subtitle: styled.div`
    margin-bottom: 10px;
    margin-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  TitleContainer: styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    word-break: keep-all;
  `,
  AnswerContainer: styled.div`
    box-sizing: border-box;
  `,
};
