import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import OptionButton from '@/components/common/OptionButton/OptionButton';
import { useToastContext } from '@/components/common/Toast/ToastContext';
import OptionModalInfoBox from '@/components/NewChecklist/OptionModal/OptionModalInfoBox';
import { flexColumn } from '@/styles/common';

export const totalOptionCount = 14;

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<number[]>;
}

const OptionModal = ({ isOpen, setIsOpen, selectedOptions, setSelectedOptions }: Props) => {
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

  const optionCounts = new Array(totalOptionCount).fill(0).map((e, i) => i + 1);

  const { showToast } = useToastContext();

  return (
    <div>
      <Modal position={'bottom'} isOpen={isOpen} onClose={onCloseModal} hasCloseButton={true}>
        <button onClick={() => showToast('체크리스트가 저장되었습니다.')}>토스트22</button>
        <Modal.header title={'방에 포함된 옵션을 선택해주세요.'}></Modal.header>
        <Modal.body>
          <S.FlexBoxColumn>
            <OptionModalInfoBox selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <S.OptionContainer>
              {optionCounts.map(optionId => (
                <OptionButton
                  onClickSelect={targetId => onToggleSelectOption(targetId)}
                  optionId={optionId}
                  key={optionId}
                  isSelected={isSelectedOption(optionId)}
                />
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 300px;

  justify-content: center;
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
