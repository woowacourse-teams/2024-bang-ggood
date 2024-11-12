import styled from '@emotion/styled';

import Bad from '@/assets/icons/answer/bad';
import Good from '@/assets/icons/answer/good';
import Modal from '@/components/_common/Modal/Modal';
import { flexCenter, omitText } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  roomTitle1: string;
  roomTitle2: string;
  isOpen: boolean;
  closeModal: () => void;
  hasOptions: hasOption[];
}

interface hasOption {
  optionName: string;
  hasRoom1: boolean;
  hasRoom2: boolean;
}

//TODO: grid 로 수정
const RoomOptionModal = ({ roomTitle1, roomTitle2, isOpen, closeModal, hasOptions }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.header>옵션 비교</Modal.header>
      <Modal.body>
        <S.Container>
          <S.ItemText isBold={true}>옵션</S.ItemText>
          <S.ItemText isBold={true}>{roomTitle1}</S.ItemText>
          <S.ItemText isBold={true}>{roomTitle2}</S.ItemText>
          {hasOptions.map(option => {
            const { optionName, hasRoom1, hasRoom2 } = option;
            return (
              <>
                <S.Item>{optionName}</S.Item>
                <S.Item>
                  {hasRoom1 ? (
                    <Good width={'1.6rem'} color={theme.palette.green600} />
                  ) : (
                    <Bad width={'1.6rem'} color={theme.palette.red600} />
                  )}
                </S.Item>
                <S.Item>
                  {hasRoom2 ? (
                    <Good width={'1.6rem'} color={theme.palette.green600} />
                  ) : (
                    <Bad width={'1.6rem'} color={theme.palette.red600} />
                  )}
                </S.Item>
              </>
            );
          })}
          <S.ItemText>총 개수</S.ItemText>
          <S.ItemText>3개</S.ItemText>
          <S.ItemText>5개</S.ItemText>
        </S.Container>
      </Modal.body>
    </Modal>
  );
};

export default RoomOptionModal;

const S = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1fr 1fr;
  `,
  ItemText: styled.div<{ isBold?: boolean }>`
    padding: 0.6rem 1rem;

    font-weight: ${({ theme, isBold }) => isBold && theme.text.weight.bold};
    ${omitText};
    text-align: center;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
  Item: styled.div`
    ${flexCenter};
    height: 2rem;
    padding: 0.6rem 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
};
