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
        <>
          {/*방 기본정보 템플릿*/}
          <NewChecklistInfoTemplate roomInfo={roomInfo} onChange={onChangeRoomInfo} />
        </>
      ) : (
        <>
          {/*체크리스트 템플릿*/}
          <NewChecklistTemplate questions={categoryQnA(currentTabId)} />
        </>
      )}
    </>
  );
};

export default NewChecklistContent;
