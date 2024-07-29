import { useTabContext } from '@/components/common/Tabs/TabContext';
import Tabs, { Tab } from '@/components/common/Tabs/Tabs';
import { addAnswerProps } from '@/pages/ChecklistSummaryPage';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { RoomInfo } from '@/types/room';

export type TemplateType = 'checklist' | 'info';

const categoryTabs: Tab[] = [
  {
    name: '기본 정보',
    id: 'info',
  },
  {
    name: '체크리스트',
    id: 'checklist',
  },
];

interface Props {
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  roomInfo: RoomInfo;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  questionSelectedAnswer: (questionId: number) => number | undefined;
}

const NewChecklistTabContainer = (props: Props) => {
  const { roomInfo, onChange, selectedOptions, setSelectedOptions, addAnswer, deleteAnswer, questionSelectedAnswer } =
    props;
  const { currentTabId } = useTabContext();

  const renderTabContent = () => {
    switch (currentTabId) {
      case 'info':
        return (
          <NewChecklistInfoTemplate
            roomInfo={roomInfo}
            onChange={onChange}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        );
      case 'checklist':
        return (
          <NewChecklistTemplate
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
            questionSelectedAnswer={questionSelectedAnswer}
          />
        );
      default:
        return <div>콘텐츠가 없습니다.</div>;
    }
  };
  return (
    <div>
      <Tabs tabList={categoryTabs} />
      {currentTabId && renderTabContent()}
    </div>
  );
};

export default NewChecklistTabContainer;
