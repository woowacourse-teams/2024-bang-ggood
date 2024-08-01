import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getChecklistSummary } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import Divider from '@/components/common/Divider/Divider';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import ChecklistAnswer from '@/components/NewChecklist/CheckListAnswer';
import theme from '@/styles/theme';
import { ChecklistInfo } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

export interface addAnswerProps {
  questionId: number;
  newAnswer: EmotionType;
}

const ChecklistSummaryPage = () => {
  // TODO: Param 으로 변경해보기
  const location = useLocation();
  const checklistId = location.state?.id;

  const [checklist, setChecklist] = useState<ChecklistInfo>();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistSummary(checklistId);
      setChecklist(checklist);
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header left={<Header.Backward />} center={<Header.Text>{checklist?.room.name}</Header.Text>} />

      <Layout bgColor={theme.palette.grey100}>
        <S.Wrapper>
          <Accordion>
            {checklist?.categories?.map(category => (
              <div key={category.categoryId}>
                <Accordion.header hasMark={true} text={category.categoryName} id={category.categoryId} />
                <Accordion.body id={category.categoryId}>
                  {category.questions.map((question, index) => {
                    const { title, subtitle, answer } = question;
                    return (
                      <>
                        <ChecklistAnswer subtitle={subtitle} title={title} answer={answer} />
                        {index !== category.questions.length - 1 && <Divider />}
                      </>
                    );
                  })}
                </Accordion.body>
              </div>
            ))}
          </Accordion>
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default ChecklistSummaryPage;

const S = {
  Wrapper: styled.div`
    min-height: calc(100vh - 64px);
  `,
};
