import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistAllQuestions, putCustomChecklist } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import TipBox from '@/components/_common/TipBox/TipBox';
import { ChecklistCustomTabs } from '@/components/ChecklistCustom/CustomTabs';
import QuestionListTemplate from '@/components/ChecklistCustom/QuestionListTemplate/QuestionListTemplate';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useHandleTipBox from '@/hooks/useHandleTipBox';
import useToast from '@/hooks/useToast';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { flexCenter, flexColumn, title2 } from '@/styles/common';

const ChecklistCustomPage = () => {
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);
  const navigate = useNavigate();

  const { setValidCategory, setChecklistAllQuestionList, selectedQuestions } = useChecklistCustomStore();

  const { resetShowTipBox } = useHandleTipBox('CUSTOM_QUESTION');

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
    /*팁 박스를 다시 보이도록 리셋*/
    resetShowTipBox();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{'체크리스트 편집'}</Header.Text>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />

      <TabProvider defaultTab={1}>
        {/*체크리스트 작성의 탭*/}
        <ChecklistCustomTabs />
        {/*체크리스트 콘텐츠 섹션*/}
        <S.Container>
          <TipBox tipType={'CUSTOM_QUESTION'} />
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
    width: calc(100% - 24px);
    ${flexColumn}
    padding: 50px 12px 30px;

    background-color: ${({ theme }) => theme.palette.background};

    min-height: calc(100vh - 120px);
  `,
};
