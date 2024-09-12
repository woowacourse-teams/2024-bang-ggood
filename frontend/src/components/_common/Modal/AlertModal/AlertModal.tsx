import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import { flexCenter, flexColumn, flexRow, title3 } from '@/styles/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleApprove: () => void;
  approveButtonName?: string;
  title: ReactNode | string;
  subtTitle?: string;
}

const AlertModal = ({ isOpen, onClose, handleApprove, approveButtonName = '삭제하기', title, subtTitle }: Props) => {
  return (
    <Modal size={'large'} isOpen={isOpen} onClose={onClose} hasCloseButton={false}>
      <Modal.body>
        <S.Container>
          <S.IconBox>
            <BangBangCryIcon width={80} height={80} />
          </S.IconBox>
          <S.Title>{title}</S.Title>
          {subtTitle && <S.subtitle>{subtTitle}</S.subtitle>}
        </S.Container>
      </Modal.body>
      <Modal.footer>
        <S.FlexBetween>
          <Button label="취소하기" isSquare={true} onClick={onClose} />
          <Button label={approveButtonName} color="dark" isSquare={true} onClick={handleApprove} />
        </S.FlexBetween>
      </Modal.footer>
    </Modal>
  );
};

export default AlertModal;

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
    gap: 1rem;
  `,
  IconBox: styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
  `,
  Title: styled.div`
    ${title3}
  `,
  subtitle: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
};
