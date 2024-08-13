import { css, keyframes } from '@emotion/react';
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
  color?: string;
}

const modalRoot = document.getElementById('modal');

// 나타나는 애니메이션
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 사라지는 애니메이션
export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const Modal = ({
  children,
  onClose,
  isOpen,
  size = 'large',
  position = 'center',
  hasCloseButton = true,
  hasDim = true,
  color,
}: ModalProps) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalMarginBottom = document.body.style.marginBottom;

    if (isOpen && hasDim) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    if (!hasDim && isOpen) {
      document.body.style.marginBottom = '450px';
    } else {
      document.body.style.marginBottom = '0px';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.marginBottom = originalMarginBottom;
    };
  }, [isOpen, hasDim]);

  if (!modalRoot) return null;

  return createPortal(
    <S.ModalWrapper open={isOpen}>
      {hasDim && <S.ModalBackground onClick={hasDim ? onClose : () => {}} hasDim={hasDim} />}
      <S.ModalOuter $position={position} $size={size} color={color} isOpen={isOpen}>
        <S.ModalInner isOpen={isOpen}>
          {children}
          {hasCloseButton && (
            <S.CloseButton>
              <CloseIcon onClick={onClose} />
            </S.CloseButton>
          )}
        </S.ModalInner>
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
    isOpen: boolean;
  }>`
    ${flexColumn}
    align-items: flex-start;

    position: fixed;
    ${({ $position, $size }) => positionStyles[$position]($size)}
  `,
  ModalInner: styled.div<{ isOpen: boolean }>`
    width: calc(100% - 24px);
    padding: 12px;

    background-color: ${({ color }) => color ?? 'white'};

    color: ${({ theme }) => theme.palette.black};

    animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s forwards;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 40%);
    min-height: 150px;
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
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    width: ${$size === 'small' ? '60%' : '85%'};
    max-width: 500px;
  `,
  bottom: ($size: ModalSize) => css`
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 16px 16px 0 0;
    width: ${$size && '100%'};
    max-width: 600px;
    box-sizing: border-box;
  `,
};
