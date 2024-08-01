import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getChecklistDetail } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import theme from '@/styles/theme';
import { ChecklistInfo } from '@/types/checklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const ChecklistDetailPage = () => {
  // TODO: Param 으로 변경해보기
  const location = useLocation();
  const checklistId = location.state?.id;

  const [checklist, setChecklist] = useState<ChecklistInfo>();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistDetail(checklistId);
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
                <Accordion.header text={category.categoryName} id={category.categoryId} />
                <Accordion.body id={category.categoryId}>
                  <ChecklistCategory type="preview" key={category.categoryId} category={category} />
                </Accordion.body>
              </div>
            ))}
          </Accordion>
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default ChecklistDetailPage;

const S = {
  Wrapper: styled.div`
    min-height: calc(100vh - 64px);
  `,
};
