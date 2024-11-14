import styled from '@emotion/styled';
import { Suspense, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import EditChecklistQuestionTemplate from '@/components/EditChecklist/ChecklistContent/EditChecklistQuestionTemplate';
import RoomInfoTemplate from '@/components/NewChecklist/NewRoomInfoForm/RoomInfoTemplate';
import OptionTemplate from '@/components/NewChecklist/Option/OptionTemplate';
import { DefaultChecklistTabsNames } from '@/constants/tabs';
import useMouseDrag from '@/hooks/useMouseDrag';

const EditChecklistContent = () => {
  const { currentTabId } = useTabContext();

  const { setCurrentTabId } = useTabContext();
  const ref = useRef<HTMLElement>(null);
  useMouseDrag(ref, (S, E) => {
    const DRAG_THRESHOLD = 100;
    const TAB_COUNT = DefaultChecklistTabsNames.length;
    const remainOp = (a: number, b: number) => (((a % b) + b + 1) % b) - 1; // 나머지연산자. -1부터 시작하므로 +1 -1
    setCurrentTabId(tabId => {
      const isLeftDrag = E.x - S.x > DRAG_THRESHOLD;
      const isRightDrag = S.x - E.x > DRAG_THRESHOLD;
      if (isLeftDrag) return remainOp(tabId - 1, TAB_COUNT);
      if (isRightDrag) return remainOp(tabId + 1, TAB_COUNT);
      return tabId;
    });
  });

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
