import { useTabContext } from '@/components/common/Tabs/TabContext';
import NewChecklistInfoTemplate from '@/pages/NewChecklistPage/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/pages/NewChecklistPage/NewChecklistTemplate';
import useChecklistStore from '@/store/useChecklistStore';
import { RoomInfo } from '@/types/room';

interface Props {
  roomInfo: RoomInfo;
  onChangeRoomInfo: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const NewChecklistContent = ({ roomInfo, onChangeRoomInfo }: Props) => {
  const { currentTabId } = useTabContext();
  const { categoryQnA } = useChecklistStore();

  return (
    <>
      {currentTabId === 0 ? (
        <NewChecklistInfoTemplate roomInfo={roomInfo} onChange={onChangeRoomInfo} />
      ) : (
        <>
          <NewChecklistTemplate questions={categoryQnA(currentTabId)} />
          <div>컨텐츠가 없습니다.</div>
        </>
      )}
    </>
  );
};

export default NewChecklistContent;
