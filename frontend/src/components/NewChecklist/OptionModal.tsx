import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button/Button';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import Modal from '@/components/common/Modal/Modal';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import OptionButton from '@/components/common/OptionButton/OptionButton';
import { flexCenter, flexColumn, title4 } from '@/styles/common';
import theme from '@/styles/theme';

const totalOptionCount = 14;

const OptionModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(selectedOptions.length === totalOptionCount);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const isSelectedOption = (optionId: number) => {
    return selectedOptions.includes(optionId);
  };

  const onToggleSelectOption = (targetId: number) => {
    if (isSelectedOption(targetId)) {
      const newSelectedOptions = selectedOptions.filter(optionId => optionId !== targetId);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, targetId]);
    }
  };

  const onClickSelectAllOptions = () => {
    if (isAllSelected) {
      return setSelectedOptions([]);
    }
    const allOptions = new Array(totalOptionCount).fill(0).map((e, i) => i + 1);
    return setSelectedOptions(allOptions);
  };

  const optionCounts = new Array(totalOptionCount).fill(0).map((e, i) => i + 1);

  useEffect(() => {
    setIsAllSelected(selectedOptions.length === totalOptionCount);
  }, [selectedOptions]);

  return (
    <div>
      <Modal position={'bottom'} isOpen={isOpen} onClose={onCloseModal} hasCloseButton={true}>
        <Modal.header title={'방에 포함된 옵션을 선택해주세요.'}></Modal.header>
        <Modal.body>
          <S.FlexBoxColumn>
            <S.ButtonContainer>
              <S.TotalSelectBox>
                <Checkbox
                  isChecked={isAllSelected}
                  onClick={onClickSelectAllOptions}
                  color={theme.palette.yellow500}
                  hoverBorderColor={theme.palette.yellow600}
                />
                <span>전체선택</span>
              </S.TotalSelectBox>
            </S.ButtonContainer>
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
          </S.FlexBoxColumn>
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: end;
`;

const FlexBoxColumn = styled.div`
  ${flexColumn}
`;

const TotalSelectBox = styled.div`
  ${flexCenter}
  gap:10px;

  span {
    ${title4};
    color: ${({ theme }) => theme.palette.grey600};
  }
`;

const S = {
  Container,
  TotalSelectBox,
  FlexBoxColumn,
  ButtonContainer,
};
