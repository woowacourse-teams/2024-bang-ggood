import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionTemplate from '@/components/NewChecklist/ChecklistQuestionTemplate';
import OptionChecklistTemplate from '@/components/NewChecklist/Option/OptionChecklistTemplate';
import RoomInfoTemplate from '@/components/NewChecklist/RoomInfoTemplate';

const ChecklistContent = () => {
  const { currentTabId } = useTabContext();

  return (
    <S.Container>
      {/*방 기본정보 템플릿 */}
      {currentTabId === -1 && <RoomInfoTemplate />}
      {/* 옵션 선택 템플릿 */}
      {currentTabId === 0 && <OptionChecklistTemplate />}
      {/* 체크리스트 템플릿 */}
      {currentTabId > 0 && (
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <ChecklistQuestionTemplate />
        </ErrorBoundary>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.main`
    position: relative;
    width: 100%;
    height: 100%;
  `,
};

export default ChecklistContent;
