import styled from '@emotion/styled';

import Bad from '@/assets/icons/answer/bad';
import Good from '@/assets/icons/answer/good';
import Modal from '@/components/_common/Modal/Modal';
import { OptionDetail } from '@/pages/RoomComparePage';
import { flexCenter, omitText } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  roomTitle1: string;
  roomTitle2: string;
  isOpen: boolean;
  closeModal: () => void;
  hasOptions: OptionDetail[];
  optionCounts: [number, number];
}

const OptionDetailModal = ({ roomTitle1, roomTitle2, isOpen, closeModal, hasOptions, optionCounts }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.header>옵션 비교</Modal.header>
      <Modal.body>
        <S.Container>
          <S.ItemText isBold={true}>옵션</S.ItemText>
          <S.ItemText isBold={true}>{roomTitle1}</S.ItemText>
          <S.ItemText isBold={true}>{roomTitle2}</S.ItemText>
          {hasOptions.map(option => {
            const { optionName, hasOption } = option;
            return (
              <>
                <S.ItemName>{optionName}</S.ItemName>
                <S.Item>
                  {hasOption[0] ? (
                    <Good width={'1.6rem'} color={theme.palette.green600} />
                  ) : (
                    <Bad width={'1.6rem'} color={theme.palette.red600} />
                  )}
                </S.Item>
                <S.Item>
                  {hasOption[1] ? (
                    <Good width={'1.6rem'} color={theme.palette.green600} />
                  ) : (
                    <Bad width={'1.6rem'} color={theme.palette.red600} />
                  )}
                </S.Item>
              </>
            );
          })}
          <S.ItemText>총 개수</S.ItemText>
          <S.ItemText hasBorder={false}>{optionCounts[0]}개</S.ItemText>
          <S.ItemText hasBorder={false}>{optionCounts[1]}개</S.ItemText>
        </S.Container>
      </Modal.body>
    </Modal>
  );
};

export default OptionDetailModal;

const S = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  `,
  ItemText: styled.div<{ isBold?: boolean; hasBorder?: boolean }>`
    padding: 0.6rem 1rem;

    font-weight: ${({ theme, isBold }) => isBold && theme.text.weight.bold};
    ${omitText};
    text-align: center;
    border-bottom: ${({ hasBorder, theme }) => hasBorder && `0.1rem solid  ${theme.palette.grey200}};`};
  `,
  Item: styled.div`
    ${flexCenter};
    height: 2rem;
    padding: 0.6rem 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
  ItemName: styled.div`
    ${flexCenter};
    height: 2rem;
    padding: 0.6rem 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
    font-weight: ${({ theme }) => theme.text.weight.medium};
  `,
};
