import styled from '@emotion/styled';

import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';
import Divider from '@/components/common/Divider/Divider';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

const QuestionCardList = () => {
  const { currentTabId } = useTabContext();
  const { categoryQnA } = useChecklistCustomStore();

  const currentQuestions = categoryQnA(currentTabId);

  return (
    <S.QuestionList>
      {currentQuestions?.questions?.map((question, index) => {
        const { questionId } = question;
        return (
          <>
            <QuestionSelectCard question={question} key={`${currentTabId}-${questionId}`} />
            {index !== currentQuestions?.questions.length - 1 && <Divider isBold={true} />}
          </>
        );
      })}
    </S.QuestionList>
  );
};

export default QuestionCardList;

const S = {
  QuestionList: styled.div`
    width: 90%;
    height: fit-content;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.palette.white};

    border-radius: 10px;
  `,
};
