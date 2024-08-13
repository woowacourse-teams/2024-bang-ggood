import styled from '@emotion/styled';

import { MemoFilled } from '@/assets/assets';
import FloatingButton from '@/components/_common/Button/FloatingButton';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import MemoModal from '@/components/NewChecklist/MemoModal/MemoModal';
import NewChecklistInfoTemplate from '@/components/NewChecklist/NewChecklistInfoTemplate';
import NewChecklistTemplate from '@/components/NewChecklist/NewChecklistTemplate';
import OptionChecklistTemplate from '@/components/NewChecklist/Option/OptionChecklistTemplate';
import useModalOpen from '@/hooks/useModalOpen';
import useChecklistStore from '@/store/useChecklistStore';

interface Props {
  memo: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const NewChecklistContent = ({ memo, onChange }: Props) => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

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
        <NewChecklistTemplate questions={getCategoryQnA(currentTabId)} />
      )}

      {/*메모 모달*/}
      {isModalOpen && <MemoModal isModalOpen={isModalOpen} modalClose={modalClose} memo={memo} onChange={onChange} />}
      {/*메모 작성 버튼*/}
      <FloatingButton onClick={modalOpen}>
        <MemoFilled />
      </FloatingButton>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    background-color: pink;
  `,
};

export default NewChecklistContent;
