import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklistQuestions, postChecklist } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { TabProvider } from '@/components/_common/Tabs/TabContext';
import NewChecklistContent from '@/components/NewChecklist/NewChecklistContent';
import NewChecklistTab from '@/components/NewChecklist/NewChecklistTab';
import { ROUTE_PATH } from '@/constants/routePath';
import { DEFAULT_TOAST_DURATION } from '@/constants/system';
import useInputs from '@/hooks/useInputs';
import useToast from '@/hooks/useToast';
import useChecklistStore from '@/store/useChecklistStore';
import useOptionStore from '@/store/useOptionStore';
import { ChecklistCategoryQnA } from '@/types/checklist';
import { RoomInfo } from '@/types/room';

// TODO: 더미 데이터 삭제하기
const DefaultRoomInfo: RoomInfo = {
  roomName: '살기 좋은 방',
  address: '인천광역시 부평구',
  deposit: 2000,
  rent: 50,
  contractTerm: 12,
  floor: 3,
  station: '잠실',
  walkingTime: 10,
  realEstate: '방끗공인중개사',
  type: undefined,
  size: undefined,
  floorLevel: undefined,
  structure: undefined,
};

const NewChecklistPage = () => {
  const { showToast } = useToast(DEFAULT_TOAST_DURATION);

  //TODO:  방 기본 정보도 전역 상태로 관리 필요

  const navigate = useNavigate();

  /* TODO: 더미 방 기본 정보 -> 이후 삭제 필요 */
  const { values: roomInfo, onChange: onChangeRoomInfo, setValues: setRoomInfo } = useInputs(DefaultRoomInfo);

  /* 선택된 옵션 */
  const { selectedOptions, resetToDefaultOptions } = useOptionStore();

  /* 체크리스트 답변 */
  const { checklistCategoryQnA, setAnswerInQuestion, setValidCategory } = useChecklistStore();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();

      // 체크리스트 질문에 대한 답안지 객체 생성
      setAnswerInQuestion(checklist);

      // 현재 질문이 있는 유효한 카테고리 생성
      setValidCategory();

      // 옵션 선택지 리셋
      resetToDefaultOptions();
    };

    fetchChecklist();
  }, []);

  /* 현재 상태를 백엔드에 보내는 답안 포맷으로 바꾸는 함수 */
  const transformQuestions = (checklist: ChecklistCategoryQnA[]) => {
    return checklist.flatMap(category =>
      category.questions.map(question => {
        const { questionId, answer } = question;
        return {
          questionId,
          answer,
        };
      }),
    );
  };

  const handleSubmitChecklist = () => {
    const fetchNewChecklist = async () => {
      await postChecklist({
        room: roomInfo,
        options: selectedOptions,
        questions: transformQuestions(checklistCategoryQnA),
      });
    };

    fetchNewChecklist().then(() => {
      showToast('체크리스트가 저장되었습니다.');
      navigate(ROUTE_PATH.checklistList);
    });
  };

  const handleClickTagButton = useCallback(
    (name: string, value: string) => {
      setRoomInfo({ ...roomInfo, [name]: value });
    },
    [roomInfo, setRoomInfo],
  );

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{'새 체크리스트'}</Header.Text>}
        right={<Button label={'저장'} size="small" color="dark" onClick={handleSubmitChecklist} />}
      />
      <TabProvider defaultTab={0}>
        {/* 체크리스트 작성의 탭 */}
        <NewChecklistTab />

        {/* 체크리스트 콘텐츠 섹션 */}
        <NewChecklistContent
          roomInfo={roomInfo}
          onChangeRoomInfo={onChangeRoomInfo}
          onClickTagButton={handleClickTagButton}
          setRoomInfo={setRoomInfo}
        />
      </TabProvider>
    </>
  );
};

export default NewChecklistPage;
