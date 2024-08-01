import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import OptionButton from '@/components/common/OptionButton/OptionButton';
import OptionModalInfoBox from '@/components/NewChecklist/OptionModal/OptionModalInfoBox';
import { flexColumn } from '@/styles/common';

export const totalOptionCount = 14;

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionModal = ({ isOpen, setIsOpen }: Props) => {
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const optionCounts = new Array(totalOptionCount).fill(0).map((e, i) => i + 1);

  return (
    <div>
      <Modal position={'center'} isOpen={isOpen} onClose={onCloseModal} hasCloseButton={true}>
        <Modal.header title={'방에 포함된 옵션을 선택해주세요.'}></Modal.header>
        <Modal.body>
          <S.FlexBoxColumn>
            <OptionModalInfoBox />
            <S.OptionContainer>
              {optionCounts.map(optionId => (
                <OptionButton optionId={optionId} key={optionId} />
              ))}
            </S.OptionContainer>
          </S.FlexBoxColumn>
        </Modal.body>
        <ModalFooter>
          <Button size={'full'} label={'옵션 선택하기'} color="dark" onClick={onCloseModal} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OptionModal;

const OptionContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(3, 1fr); */
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;

  /* width: 300px; */

  /* justify-content: center; */
  place-items: center;
`;

const FlexBoxColumn = styled.div`
  ${flexColumn}
  width:100%;

  align-items: center;
`;

const S = {
  OptionContainer,
  FlexBoxColumn,
};
