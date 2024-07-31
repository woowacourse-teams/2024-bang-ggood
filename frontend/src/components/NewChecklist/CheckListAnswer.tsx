import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import { emotionPhrase } from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import { ChecklistAnswer } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

// interface Emotions {
//   name: Emotion;
//   id: number;
// }

// function getEmotionNameById(id: number): Emotion | null {
//   const emotions: Emotions[] = [
//     { name: 'BAD', id: 1 },
//     { name: 'SOSO', id: 2 },
//     { name: 'GOOD', id: 3 },
//   ];

//   const emotion = emotions.find(e => e.id === id);
//   return emotion ? emotion.name : null;
// }

interface Props {
  subtitle: string;
  title: string;
  answer: EmotionType;
}

const ChecklistAnswer = ({ answer, title, subtitle }: Props) => {
  // const emotionName = getEmotionNameById(QandA?.answer);
  // const { checklistQuestions } = useChecklist();
  // questionId: number;
  // title: string;
  // subtitle: string | null;
  // const { title, subtitle, questionId } = checklistQuestions;

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>
          <QuestionDot />
          {title}
        </S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleContainer>
      <S.Answer>
        <FaceMark>
          <FaceMark.FaceIcon emotion={answer} isFilled={true} />
          <FaceMark.Footer>{emotionPhrase[answer]}</FaceMark.Footer>
          {/* <FaceMark.Footer>{Math.round(category.score / 10)}점</FaceMark.Footer> */}
        </FaceMark>
      </S.Answer>
    </S.Container>
  );
};

export default ChecklistAnswer;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    padding: 16px 24px;

    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    margin: 5px 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5rem;
    align-items: center;
    gap: 10px;
  `,
  Subtitle: styled.div`
    width: 80%;
    margin-bottom: 10px;
    margin-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  Answer: styled.div`
    width: 80px;
  `,
  TitleContainer: styled.div`
    display: flex;
    width: 400px;
    flex-direction: column;
  `,
};
