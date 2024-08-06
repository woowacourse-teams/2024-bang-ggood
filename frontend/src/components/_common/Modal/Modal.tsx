import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentPropsWithRef } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/assets/assets';
import ModalBody from '@/components/_common/Modal/ModalBody';
import ModalFooter from '@/components/_common/Modal/ModalFooter';
import ModalHeader from '@/components/_common/Modal/ModalHeader';

type ModalPosition = 'center' | 'bottom';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps extends ComponentPropsWithRef<'dialog'> {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  position?: ModalPosition;
  hasCloseButton?: boolean;
}

const modalRoot = document.getElementById('modal');

const Modal = ({
  children,
  onClose,
  isOpen,
  size = 'large',
  position = 'center',
  hasCloseButton = true,
}: ModalProps) => {
  if (!modalRoot) return null;

  return createPortal(
    <S.ModalWrapper open={isOpen}>
      <S.ModalBackground onClick={onClose} />
      <S.ModalOuter $position={position} $size={size}>
        {children}
        {hasCloseButton && (
          <S.CloseButton>
            <CloseIcon onClick={onClose} />
          </S.CloseButton>
        )}
      </S.ModalOuter>
    </S.ModalWrapper>,
    modalRoot,
  );
};

Modal.header = ModalHeader;
Modal.footer = ModalFooter;
Modal.body = ModalBody;

export default Modal;

const S = {
  ModalWrapper: styled.div<{ open: boolean }>`
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.MODAL};

    width: 100%;
    height: 100vh;
  `,
  ModalBackground: styled.div`
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 35%);
  `,
  ModalOuter: styled.div<{
    $position: ModalPosition;
    $size: ModalSize;
  }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    position: fixed;
    left: 50%;
    ${({ $position }) => positionStyles[$position]}

    min-height: 150px;
    padding: 12px;

    background-color: ${({ theme }) => theme.palette.white};

    color: ${({ theme }) => theme.palette.black};
  `,
  CloseButton: styled.button`
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
};

const positionStyles = {
  center: css`
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    width: 100%;
    max-width: 85%;
  `,
  bottom: css`
    bottom: 0;
    transform: translate(-50%, 0%);
    border-radius: 16px 16px 0 0;
    width: 100%;
    box-sizing: border-box;
  `,
};
