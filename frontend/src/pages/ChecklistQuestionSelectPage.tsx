import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import TipBox from '@/components/_common/TipBox/TipBox';
import { ChecklistQuestionSelectTabs } from '@/components/ChecklistQuestionSelect/ChecklistQuestionSelectTabs';
import QuestionListTemplate from '@/components/ChecklistQuestionSelect/QuestionListTemplate/QuestionListTemplate';
import { TOAST_MESSAGE } from '@/constants/messages/message';
import { ROUTE_PATH } from '@/constants/routePath';
import usePutCustomChecklist from '@/hooks/query/usePutCustomChecklist';
import useHandleTip from '@/hooks/useHandleTip';
import useToast from '@/hooks/useToast';
import { trackCustomChecklist } from '@/service/amplitude/trackEvent';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';
import theme from '@/styles/theme';

const ChecklistQuestionSelectPage = () => {
  const navigate = useNavigate();
  useTrackPageView({ eventName: '[View] 체크리스트 질문 편집 페이지' });
  const { showToast } = useToast();

  const { mutate: putCustomChecklist } = usePutCustomChecklist();
  const { selectedQuestions, setValidCategory } = useChecklistQuestionSelectStore();
  const { resetShowTip } = useHandleTip('CUSTOM_QUESTION');

  const handleSubmitChecklist = () => {
    if (!selectedQuestions.length) {
      showToast({ message: TOAST_MESSAGE.MIN_CUSTOM_SELECT, type: 'info' });
      return;
    }

    putCustomChecklist(selectedQuestions, {
      onSuccess: () => {
        showToast({ message: TOAST_MESSAGE.CUSTOM });
        navigate(ROUTE_PATH.checklistList);
        trackCustomChecklist();
      },
    });
  };

  useEffect(() => {
    const fetchChecklist = async () => {
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
        center={<Header.Text>{'체크리스트 질문 편집'}</Header.Text>}
        right={
          <Button
            label="저장"
            size="small"
            color="dark"
            isSquare
            onClick={handleSubmitChecklist}
            id="checklistSubmitButton"
          />
        }
      />
      <TabProvider defaultTab={1}>
        {/* 질문 카테고리 탭 */}
        <ErrorBoundary fallback={<div style={{ height: '5.4rem' }} />}>
          <ChecklistQuestionSelectTabs />
        </ErrorBoundary>
        {/* 질문 콘텐츠 섹션*/}
        <Layout bgColor={theme.palette.background} withHeader withTab>
          <TipBox tipType={'CUSTOM_QUESTION'} />
          <ErrorBoundary FallbackComponent={ListErrorFallback}>
            <Suspense>
              <QuestionListTemplate />
            </Suspense>
          </ErrorBoundary>
          {/* <CustomChecklistQuestionSection /> TODO: 다시 추가하기 */}
        </Layout>
      </TabProvider>
    </>
  );
};

export default ChecklistQuestionSelectPage;
