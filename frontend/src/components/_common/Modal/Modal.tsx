import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentPropsWithRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/assets/assets';
import ModalBody from '@/components/_common/Modal/ModalBody';
import ModalFooter from '@/components/_common/Modal/ModalFooter';
import ModalHeader from '@/components/_common/Modal/ModalHeader';
import { flexColumn } from '@/styles/common';

type ModalPosition = 'center' | 'bottom';

type ModalSize = 'small' | 'large';

export interface ModalProps extends ComponentPropsWithRef<'dialog'> {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  position?: ModalPosition;
  hasCloseButton?: boolean;
  hasDim?: boolean;
}

const modalRoot = document.getElementById('modal');

const Modal = ({
  children,
  onClose,
  isOpen,
  size = 'large',
  position = 'center',
  hasCloseButton = true,
  hasDim = true,
}: ModalProps) => {
  {
    /*모달 뒤 스크롤 막기*/
  }
  useEffect(() => {
    if (isOpen && hasDim) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  });

  if (!modalRoot) return null;

  return createPortal(
    <S.ModalWrapper open={isOpen}>
      <S.ModalBackground onClick={hasDim ? onClose : () => {}} hasDim={hasDim} />
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
  ModalBackground: styled.div<{ hasDim: boolean }>`
    position: fixed;
    inset: 0;
    background: ${({ hasDim }) => (hasDim ? 'rgb(0 0 0 / 35%)' : 'transparent')};
  `,
  ModalOuter: styled.div<{
    $position: ModalPosition;
    $size: ModalSize;
  }>`
    ${flexColumn}
    align-items: flex-start;

    position: fixed;
    left: 50%;
    ${({ $position, $size }) => positionStyles[$position]($size)}

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
  center: ($size: ModalSize) => css`
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    width: ${$size === 'small' ? '60%' : '85%'};
    max-width: 500px;
  `,
  bottom: ($size: ModalSize) => css`
    bottom: 0;
    transform: translate(-50%, 0%);
    border-radius: 16px 16px 0 0;
    width: ${$size && '100%'};
    max-width: 600px;
    box-sizing: border-box;
  `,
};
