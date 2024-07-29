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

const NewChecklistBody = (props: Props) => {
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
      case 0: //기본 정보
        return (
          <NewChecklistInfoTemplate
            roomInfo={roomInfo}
            onChange={onChange}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
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
      {currentTabId !== null && currentTabId !== undefined && renderTabContent()}
    </div>
  );
};

export default NewChecklistBody;
