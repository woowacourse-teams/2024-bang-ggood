import { useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import Tabs, { Tab } from '@/components/common/Tabs/Tabs';
import { addAnswerProps } from '@/pages/ChecklistSummaryPage';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import { ChecklistCategoryQuestions } from '@/types/checklist';
import { RoomInfo } from '@/types/room';

export type TemplateType = 'checklist' | 'info';

interface Props {
  categoryTabs: Tab[];
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  roomInfo: RoomInfo;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  questionSelectedAnswer: (questionId: number) => number | undefined;
}

const NewChecklistTabContainer = (props: Props) => {
  const {
    categoryTabs,
    roomInfo,
    onChange,
    selectedOptions,
    setSelectedOptions,
    addAnswer,
    deleteAnswer,
    questionSelectedAnswer,
  } = props;
  const { currentTabId } = useTabContext();

  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  const findQuestions = (targetId: number) => {
    return checklistQuestions.filter(category => category.categoryId === targetId)[0].questions;
  };

  const renderTabContent = () => {
    switch (currentTabId) {
      case 0:
        return (
          <NewChecklistInfoTemplate
            roomInfo={roomInfo}
            onChange={onChange}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        );
      case 1: //청결
        return (
          <NewChecklistTemplate
            checklistQuestions={findQuestions(currentTabId)}
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
