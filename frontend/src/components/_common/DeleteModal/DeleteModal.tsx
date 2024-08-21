import styled from '@emotion/styled';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import { flexCenter, flexColumn, flexRow, title2 } from '@/styles/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteModal = ({ isOpen, onClose, handleDelete }: Props) => {
  return (
    <Modal size={'large'} isOpen={isOpen} onClose={onClose} hasCloseButton={false}>
      <Modal.body>
        <S.Container>
          <BangBangCryIcon width={100} height={150} />
          <S.Title>
            정말 <S.AccentText>체크리스트</S.AccentText>를 삭제하시겠습니까?
          </S.Title>
          <S.subtitle>삭제한 체크리스트는 다시 확인할 수 없습니다.</S.subtitle>
        </S.Container>
      </Modal.body>
      <Modal.footer>
        <S.FlexBetween>
          <Button label="취소하기" isSquare={true} onClick={onClose} />
          <Button label="삭제하기" color="dark" isSquare={true} onClick={handleDelete} />
        </S.FlexBetween>
      </Modal.footer>
    </Modal>
  );
};

export default DeleteModal;

const S = {
  Container: styled.div`
    width: 100%;

    ${flexColumn}
    ${flexCenter}
    text-align: center;
  `,
  FlexBetween: styled.div`
    width: 100%;
    ${flexRow}
    justify-content: space-around;
  `,
  Title: styled.div`
    ${title2}
  `,
  AccentText: styled.span`
    color: ${({ theme }) => theme.palette.green600};
  `,
  subtitle: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
};
