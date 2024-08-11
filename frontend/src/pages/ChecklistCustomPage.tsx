import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistAllQuestions, putCustomChecklist } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import { ChecklistCustomTabs } from '@/components/ChecklistCustom/CustomTabs';
import QuestionListTemplate from '@/components/ChecklistCustom/QuestionListTemplate/QuestionListTemplate';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useToast from '@/hooks/useToast';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { flexCenter, title2 } from '@/styles/common';

const ChecklistCustomPage = () => {
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);
  const navigate = useNavigate();

  const { setValidCategory, setChecklistAllQuestionList, selectedQuestions } = useChecklistCustomStore();

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = async () => {
      await putCustomChecklist({ questionIds: selectedQuestions });
    };

    try {
      fetchNewChecklist().then(() => {
        showToast('체크리스트가 수정되었습니다.');
        navigate(ROUTE_PATH.checklistList);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistQuestions = await getChecklistAllQuestions();
      /*체크리스트의 모든 질문 전역 상태로 저장 */
      setChecklistAllQuestionList(checklistQuestions);
      /*체크리스트의 유효한 카테고리만 탭으로 생성 */
      setValidCategory();
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<S.Title>{'체크리스트 편집'}</S.Title>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />
      <TabProvider defaultTab={1}>
        {/*체크리스트 작성의 탭*/}
        <ChecklistCustomTabs />
        {/*체크리스트 콘텐츠 섹션*/}
        <S.Container>
          <QuestionListTemplate />
        </S.Container>
      </TabProvider>
    </>
  );
};

export default ChecklistCustomPage;

const S = {
  Title: styled.div`
    ${title2}
    ${flexCenter}
  `,
  Container: styled.div`
    display: flex;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 30px;

    background-color: ${({ theme }) => theme.palette.background};
    min-height: calc(100vh - 120px);
    justify-content: center;
  `,
};
