import styled from '@emotion/styled';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import NewChecklistInfoTemplate from '@/components/NewChecklist/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/components/NewChecklist/NewChecklistTemplate';
import OptionChecklistTemplate from '@/components/NewChecklist/Option/OptionChecklistTemplate';

const NewChecklistContent = () => {
  const { currentTabId } = useTabContext();

  return (
    <S.Container>
      {currentTabId === -1 ? (
        /*방 기본정보 템플릿*/
        <NewChecklistInfoTemplate />
      ) : currentTabId === 0 ? (
        /*옵션 선택 템플릿*/
        <OptionChecklistTemplate />
      ) : (
        /* 체크리스트 템플릿 */
        <NewChecklistTemplate />
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
};

export default NewChecklistContent;
