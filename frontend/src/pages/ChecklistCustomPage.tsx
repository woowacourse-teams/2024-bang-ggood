import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistQuestions, putCustomChecklist } from '@/apis/checklist';
import QuestionCardList from '@/components/ChecklistCustom/QuestionCardList/QuestionCardList';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import ChecklistTabs from '@/components/common/Tabs/NewChecklistTab';
import { TabProvider, useTabContext } from '@/components/common/Tabs/TabContext';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { flexCenter, title2 } from '@/styles/common';

const ChecklistCustomPage = () => {
  const { showToast } = useToast(3);

  const { currentTabId } = useTabContext();
  const { categoryQnA, setChecklistAllQuestionList } = useChecklistCustomStore();

  const currentQuestions = categoryQnA(currentTabId);

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = async () => {
      await putCustomChecklist({ questionIds: selectedQuestions });
    };

    try {
      fetchNewChecklist();
      showToast('체크리스트가 수정되었습니다.');
      navigate(ROUTE_PATH.checklistList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistQuestions = await getChecklistQuestions();

      /*체크리스트의 모든 질문 전역 상태로 저장 */
      setChecklistAllQuestionList(checklistQuestions);
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'새 체크리스트'}</S.Title>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />
      <TabProvider>
        {/*체크리스트 작성의 탭*/}
        <ChecklistTabs mode="edit" />
        {/*체크리스트 콘텐츠 섹션*/}
        <QuestionCardList questions={currentQuestions.questions} />
      </TabProvider>
    </>
  );
};

export default ChecklistCustomPage;

const Title = styled.div`
  ${title2}
  ${flexCenter}
`;

const S = {
  Title,
};
