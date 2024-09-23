import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistAllQuestions } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import TipBox from '@/components/_common/TipBox/TipBox';
import { ChecklistCustomTabs } from '@/components/ChecklistCustom/CustomTabs';
import QuestionListTemplate from '@/components/ChecklistCustom/QuestionListTemplate/QuestionListTemplate';
import { TOAST_MESSAGE } from '@/constants/message';
import { ROUTE_PATH } from '@/constants/routePath';
import usePutCustomChecklist from '@/hooks/query/usePutCustomChecklist';
import useHandleTipBox from '@/hooks/useHandleTipBox';
import useToast from '@/hooks/useToast';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import theme from '@/styles/theme';

const ChecklistCustomPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate: putCustomChecklist } = usePutCustomChecklist();
  const { setValidCategory, setChecklistAllQuestionList, selectedQuestions } = useChecklistCustomStore();

  const { resetShowTipBox } = useHandleTipBox('CUSTOM_QUESTION');

  const handleSubmitChecklist = () => {
    putCustomChecklist(selectedQuestions, {
      onSuccess: () => {
        showToast(TOAST_MESSAGE.ADD);
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
        {/* 질문 카테고리 탭 */}
        <ChecklistCustomTabs />
        {/* 질문 콘텐츠 섹션*/}
        <Layout bgColor={theme.palette.background} withHeader withTab>
          <TipBox tipType={'CUSTOM_QUESTION'} />
          <QuestionListTemplate />
        </Layout>
      </TabProvider>
    </>
  );
};

export default ChecklistCustomPage;
