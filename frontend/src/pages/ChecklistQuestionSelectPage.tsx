import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistAllQuestions } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import TipBox from '@/components/_common/TipBox/TipBox';
import { ChecklistQuestionSelectTabs } from '@/components/ChecklistQuestionSelect/ChecklistQuestionSelectTabs';
import QuestionListTemplate from '@/components/ChecklistQuestionSelect/QuestionListTemplate/QuestionListTemplate';
import { TOAST_MESSAGE } from '@/constants/message';
import { ROUTE_PATH } from '@/constants/routePath';
import usePutCustomChecklist from '@/hooks/query/usePutCustomChecklist';
import useHandleTip from '@/hooks/useHandleTip';
import useToast from '@/hooks/useToast';
import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';
import theme from '@/styles/theme';

const ChecklistQuestionSelectPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate: putCustomChecklist } = usePutCustomChecklist();
  const { selectedQuestions, setValidCategory, setChecklistAllQuestionList } = useChecklistQuestionSelectStore();

  const { resetShowTip } = useHandleTip('CUSTOM_QUESTION');

  const handleSubmitChecklist = () => {
    if (!selectedQuestions.length) {
      showToast(TOAST_MESSAGE.MIN_CUSTOM_SELECT);
      return;
    }

    putCustomChecklist(selectedQuestions, {
      onSuccess: () => {
        showToast(TOAST_MESSAGE.CUSTOM);
        navigate(ROUTE_PATH.checklistList);
      },
    });
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
    resetShowTip();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{'체크리스트 항목 편집'}</Header.Text>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />
      <TabProvider defaultTab={1}>
        {/* 질문 카테고리 탭 */}
        <ChecklistQuestionSelectTabs />
        {/* 질문 콘텐츠 섹션*/}
        <Layout bgColor={theme.palette.background} withHeader withTab>
          <TipBox tipType={'CUSTOM_QUESTION'} />
          <QuestionListTemplate />
        </Layout>
      </TabProvider>
    </>
  );
};

export default ChecklistQuestionSelectPage;
