import styled from '@emotion/styled';

import { useTabContext } from '@/components/common/Tabs/TabContext';
import Tabs from '@/components/common/Tabs/Tabs';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { ChecklistAnswer } from '@/types/checklist';
import { RoomInfo } from '@/types/room';
import { Tab } from '@/types/tab';

interface Props {
  newChecklistTabs: Tab[];
  // selectedOptions: number[];
  // setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  roomInfo: RoomInfo;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // questionSelectedAnswer: (questionId: number) => EmotionType | undefined;
  checklistAnswers: ChecklistAnswer[];
}

const NewChecklistBody = (props: Props) => {
  const { newChecklistTabs, roomInfo, onChange } = props;
  const { currentTabId } = useTabContext();

  // const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  //답변 바뀔 때마다 해당 카테고리에 답변이 다 채워졌는지 확인하는 로직

  // const findQuestions = (targetId: number) => {
  //   return checklistQuestions.filter(category => category.categoryId === targetId)[0].questions;
  // };

  // const { questionSelectedAnswer } = useChecklist();

  //TODO: 임시 수정 필요
  const newChecklistTabsWithCompletion = newChecklistTabs.map(tabInfo => ({ ...tabInfo, isCompleted: false }));

  const renderTabContent = () => {
    switch (currentTabId) {
      case 0: //기본 정보
        return (
          <NewChecklistInfoTemplate
            roomInfo={roomInfo}
            onChange={onChange}
            // selectedOptions={selectedOptions}
            // setSelectedOptions={setSelectedOptions}
          />
        );
      case 1: //청결
      case 2: //방 컨디션
      case 3: //편의시설
      case 4: //옵션
      case 5: //주거 환경
      case 6: //보안
      case 7: //경제적
        return (
          <NewChecklistTemplate
          // currentTabId={currentTabId}
          // checklistQuestions={findQuestions(currentTabId)}
          // questionSelectedAnswer={questionSelectedAnswer}
          />
        );

      default:
        return <div>콘텐츠가 없습니다.</div>;
    }
  };
  return (
    <div>
      <Tabs tabList={newChecklistTabsWithCompletion} />
      <S.ContentBox>{currentTabId !== null && currentTabId !== undefined && renderTabContent()}</S.ContentBox>
    </div>
  );
};

export default NewChecklistBody;

const ContentBox = styled.div`
  overflow-x: hidden;
  min-height: calc(100vh - 60px);
`;

const S = {
  ContentBox,
};
