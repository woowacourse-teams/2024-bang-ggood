import styled from '@emotion/styled';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionTemplate from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestionTemplate';
import RoomInfoTemplate from '@/components/NewChecklist/NewRoomInfoForm/RoomInfoTemplate';
import OptionTemplate from '@/components/NewChecklist/Option/OptionTemplate';

const ChecklistContent = () => {
  const { currentTabId, useDragForTab } = useTabContext();
  useDragForTab();

  return (
    <S.Container>
      {/*방 기본정보 템플릿 */}
      {currentTabId === -1 && <RoomInfoTemplate />}
      {/* 옵션 선택 템플릿 */}
      {currentTabId === 0 && <OptionTemplate />}
      {/* 체크리스트 템플릿 */}
      {currentTabId > 0 && (
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense>
            <ChecklistQuestionTemplate />
          </Suspense>
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
