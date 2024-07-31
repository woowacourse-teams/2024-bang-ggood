import styled from '@emotion/styled';

import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

interface Props {
  questionSelectedAnswer: (questionId: number) => number | undefined;
  checklistQuestions: ChecklistQuestion[];
}

const NewChecklistTemplate = (props: Props) => {
  const { questionSelectedAnswer, checklistQuestions } = props;

  return (
    <S.ContentBox>
      {checklistQuestions?.map(question => (
        <S.QuestionBox key={`question-${question.questionId}`}>
          <ChecklistQuestion question={question} questionSelectedAnswer={questionSelectedAnswer} />
        </S.QuestionBox>
      ))}
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  padding: 0 16px;
  padding-top: 60px;
  padding-bottom: 16px;

  background-color: ${({ theme }) => theme.palette.background};
  gap: 10px;
  flex-direction: column;
  min-height: calc(100vh - 70px);
`;

const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
`;

const S = {
  ContentBox,
  QuestionBox,
};
