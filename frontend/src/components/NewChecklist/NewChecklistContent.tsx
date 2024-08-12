import { useTabContext } from '@/components/_common/Tabs/TabContext';
import NewChecklistInfoTemplate from '@/components/NewChecklist/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/components/NewChecklist/NewChecklistTemplate';
import OptionChecklistTemplate from '@/components/NewChecklist/Option/OptionChecklistTemplate';
import useChecklistStore from '@/store/useChecklistStore';

const NewChecklistContent = () => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();

  return currentTabId === -1 ? (
    /*방 기본정보 템플릿*/

    <NewChecklistInfoTemplate /> : currentTabId === 0 ? (
    /*옵션 선택 템플릿*/
    <OptionChecklistTemplate />
  ) : (
    /* 체크리스트 템플릿 */
    <NewChecklistTemplate questions={getCategoryQnA(currentTabId)} />
  );
};

export default NewChecklistContent;
