import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import { flexCenter, flexColumn, flexRow, title4 } from '@/styles/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleApprove: () => void;
  approveButtonName?: string;
  title: ReactNode | string;
  subtTitle?: string;
  hasIcon?: boolean;
}

const AlertModal = ({
  isOpen,
  onClose,
  handleApprove,
  approveButtonName = '삭제하기',
  title,
  subtTitle,
  hasIcon = true,
}: Props) => {
  return (
    <Modal size={hasIcon ? 'large' : 'small'} isOpen={isOpen} onClose={onClose} hasCloseButton={false}>
      <Modal.body>
        <S.Container>
          <S.IconBox>{hasIcon && <BangBangCryIcon width={70} height={70} />}</S.IconBox>
          <S.Title>{title}</S.Title>
          {subtTitle && <S.subtitle>{subtTitle}</S.subtitle>}
        </S.Container>
      </Modal.body>
      <Modal.footer>
        <S.FlexBetween>
          <S.AlertModalButton size="full" label="취소하기" isSquare={true} onClick={onClose} />
          <S.AlertModalButton
            size="full"
            label={approveButtonName}
            color="dark"
            isSquare={true}
            onClick={handleApprove}
          />
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
    gap: 10px;
  `,
  IconBox: styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
  `,
  Title: styled.div`
    ${title4}
  `,
  subtitle: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
  AlertModalButton: styled(Button)`
    size: calc(100% - 10px);
    ${title4}
    height:40px;
  `,
};
