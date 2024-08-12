import { Dispatch, SetStateAction } from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import NewChecklistInfoTemplate from '@/components/NewChecklist/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/components/NewChecklist/NewChecklistTemplate';
import OptionChecklistTemplate from '@/components/NewChecklist/Option/OptionChecklistTemplate';
import useChecklistStore from '@/store/useChecklistStore';
import { RoomInfo } from '@/types/room';

interface Props {
  roomInfo: RoomInfo;
  onChangeRoomInfo: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClickTagButton: (name: string, value: string) => void;
  setRoomInfo: Dispatch<SetStateAction<RoomInfo>>;
}

const NewChecklistContent = ({
  roomInfo,
  onChangeRoomInfo,
  onClickTagButton: onClickTagButton,
  setRoomInfo,
}: Props) => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();

  return currentTabId === -1 ? (
    /*방 기본정보 템플릿*/
    <NewChecklistInfoTemplate
      roomInfo={roomInfo}
      onChange={onChangeRoomInfo}
      setRoomInfo={setRoomInfo}
      onClickTagButton={onClickTagButton}
    />
  ) : currentTabId === 0 ? (
    /*옵션 선택 템플릿*/
    <OptionChecklistTemplate />
  ) : (
    /* 체크리스트 템플릿 */
    <NewChecklistTemplate questions={getCategoryQnA(currentTabId)} />
  );
};

export default NewChecklistContent;
