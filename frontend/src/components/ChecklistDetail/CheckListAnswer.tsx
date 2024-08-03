import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import { emotionPhrase } from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
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
      <S.Answer>
        <FaceMark>
          <FaceMark.FaceIcon emotion={grade} isFilled={true} />
          {/* TODO : 기존에 null 체크 안되고있었음. 일단 SOSO로 해뒀으나 미입력시의 아이콘으로 수정필요 */}
          <FaceMark.Footer>{emotionPhrase[grade ?? 'SOSO']}</FaceMark.Footer>
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
