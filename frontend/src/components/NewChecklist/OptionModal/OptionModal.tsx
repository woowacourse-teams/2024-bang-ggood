import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import ModalFooter from '@/components/_common/Modal/ModalFooter';
import OptionButton from '@/components/_common/OptionButton/OptionButton';
import { OPTION_COUNT } from '@/components/_common/OptionButton/OptionIcon';
import OptionModalInfoBox from '@/components/NewChecklist/OptionModal/OptionModalInfoBox';
import { flexColumn } from '@/styles/common';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionModal = ({ isOpen, setIsOpen }: Props) => {
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const optionCounts = new Array(OPTION_COUNT).fill(0).map((e, i) => i + 1);

  return (
    <Modal position={'center'} size={'small'} isOpen={isOpen} onClose={onCloseModal} hasCloseButton={true}>
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
  );
};

export default OptionModal;

const OptionContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  place-items: center center;

  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
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
