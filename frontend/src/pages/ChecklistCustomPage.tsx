import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistQuestions, putCustomChecklist } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import ChecklistTabs from '@/components/common/Tabs/NewChecklistTab';
import { TabProvider } from '@/components/common/Tabs/TabContext';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { flexCenter, title2 } from '@/styles/common';

const ChecklistCustomPage = () => {
  const { showToast } = useToast(3);

  /*체크리스트 답변*/
  const { setChecklistAllQuestionList } = useChecklistCustomStore();
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
