import styled from '@emotion/styled';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import EditChecklistQuestionTemplate from '@/components/EditChecklist/ChecklistContent/EditChecklistQuestionTemplate';
import RoomInfoTemplate from '@/components/NewChecklist/NewRoomInfoForm/RoomInfoTemplate';
import OptionTemplate from '@/components/NewChecklist/Option/OptionTemplate';

const EditChecklistContent = () => {
  const { currentTabId, useDragForTab } = useTabContext();

  const ref = useDragForTab();

  return (
    <S.Container ref={ref}>
      {/*방 기본정보 템플릿 */}
      {currentTabId === -1 && <RoomInfoTemplate />}
      {/* 옵션 선택 템플릿 */}
      {currentTabId === 0 && <OptionTemplate />}
      {/* 체크리스트 템플릿 */}
      {currentTabId > 0 && (
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense>
            <EditChecklistQuestionTemplate />
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

export default EditChecklistContent;
