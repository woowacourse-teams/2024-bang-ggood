import styled from '@emotion/styled';

import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

interface Props {
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  questionSelectedAnswer: (questionId: number) => number | undefined;
  checklistQuestions: ChecklistQuestion[];
}

const NewChecklistTemplate = (props: Props) => {
  const { questionSelectedAnswer, addAnswer, deleteAnswer, checklistQuestions } = props;

  // const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  // useEffect(() => {
  //   const fetchChecklist = async () => {
  //     const checklist = await getChecklistQuestions();
  //     setChecklistQuestions(checklist);
  //   };
  //   fetchChecklist();
  // }, []);

  return (
    <S.ContentBox>
      {checklistQuestions?.map(question => (
        <div key={`question-${question.questionId}`}>
          <ChecklistQuestion
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
            question={question}
            questionSelectedAnswer={questionSelectedAnswer}
          />
        </div>
      ))}
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  padding: 16px;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.palette.backgroud};
`;
const S = {
  ContentBox,
};
