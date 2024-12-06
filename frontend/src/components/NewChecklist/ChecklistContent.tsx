import styled from '@emotion/styled';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionTemplate from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestionTemplate';
import RoomInfoTemplate from '@/components/NewChecklist/NewRoomInfoForm/RoomInfoTemplate';
import OptionTemplate from '@/components/NewChecklist/Option/OptionTemplate';
import useChecklistStore from '@/store/useChecklistStore';

const ChecklistContent = () => {
  const { currentTabId, useDragForTab } = useTabContext();
  const categories = useChecklistStore().categories;
  const categoriesLength = categories.length + 2;
  useDragForTab();

  return (
    <S.Container>
      {/*방 기본정보 템플릿 */}
      {currentTabId === -1 && <RoomInfoTemplate tabCount={categoriesLength} />}
      {/* 옵션 선택 템플릿 */}
      {currentTabId === 0 && <OptionTemplate tabCount={categoriesLength} />}
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
