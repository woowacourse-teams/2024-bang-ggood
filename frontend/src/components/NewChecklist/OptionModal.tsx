import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import OptionButton from '@/components/common/OptionButton/OptionButton';

const OptionModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const isSelectedOption = (optionId: number) => {
    return selectedOptions.includes(optionId);
  };

  const onToggleSelectOption = (targetId: number) => {
    if (isSelectedOption(targetId)) {
      const newSelectedOptions = selectedOptions.filter(optionId => optionId !== targetId);
      return setSelectedOptions(newSelectedOptions);
    }
    setSelectedOptions([...selectedOptions, targetId]);
  };

  const optionCounts = new Array(14).fill(0).map((e, i) => i + 1);

  return (
    <div>
      <Modal position={'bottom'} isOpen={isOpen} onClose={onCloseModal} hasCloseButton={true}>
        <Modal.header title={'방에 포함된 옵션을 선택해주세요.'} />
        <Modal.body>
          <S.Container>
            {optionCounts.map(optionId => (
              <OptionButton
                onClickSelect={targetId => onToggleSelectOption(targetId)}
                optionId={optionId}
                key={optionId}
                isSelected={isSelectedOption(optionId)}
              />
            ))}
          </S.Container>
        </Modal.body>
        <ModalFooter>
          <Button size={'full'} label={'옵션 선택하기'} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OptionModal;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  justify-content: center;
  place-items: center;
`;

const S = {
  Container,
};
