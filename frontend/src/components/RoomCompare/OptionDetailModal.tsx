import styled from '@emotion/styled';

import Bad from '@/assets/icons/answer/bad';
import Good from '@/assets/icons/answer/good';
import Modal from '@/components/_common/Modal/Modal';
import { OptionDetail } from '@/pages/RoomComparePage';
import { flexCenter, flexSpaceBetween } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

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
          <S.ItemText>옵션</S.ItemText>
          <S.ItemText>{roomTitle1}</S.ItemText>
          <S.ItemText>{roomTitle2}</S.ItemText>
          {hasOptions.map(option => {
            const { optionName, hasOption } = option;
            return (
              <>
                <S.ItemName>{optionName}</S.ItemName>
                <S.Item>
                  {hasOption[0] ? (
                    <Good width="1.6rem" color={theme.palette.green600} />
                  ) : (
                    <Bad width="1.6rem" color={theme.palette.red600} />
                  )}
                </S.Item>
                <S.Item>
                  {hasOption[1] ? (
                    <Good width="1.6rem" color={theme.palette.green600} />
                  ) : (
                    <Bad width="1.6rem" color={theme.palette.red600} />
                  )}
                </S.Item>
              </>
            );
          })}
          <S.ItemText>총 개수</S.ItemText>
          <S.ItemText>{optionCounts[0]}개</S.ItemText>
          <S.ItemText>{optionCounts[1]}개</S.ItemText>
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
  ItemText: styled.div`
    padding: 0.6rem 1rem;
    ${fontStyle(theme.font.body[1].M)}
    overflow-wrap: break-word;
    word-break: break-word;

    text-align: center;
  `,
  Item: styled.div`
    ${flexCenter};
    height: 2rem;
    padding: 0.6rem 1rem;
  `,
  ItemName: styled.div`
    ${flexSpaceBetween};
    height: 2rem;
    padding: 0.6rem 1rem;
    ${fontStyle(theme.font.body[1].R)};
    color: ${theme.color.gray[500]};
  `,
};
