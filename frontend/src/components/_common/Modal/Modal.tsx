import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentPropsWithRef } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/assets/assets';
import { fadeIn, fadeOut } from '@/styles/animation';
import { flexColumn } from '@/styles/common';

import FocusTrap from './FocusTrap/FocusTrap';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

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
  backgroundColor?: string;
}

const modalRoot = document.getElementById('modal');

const Modal = ({
  children,
  onClose,
  isOpen,
  size = 'large',
  position = 'center',
  hasCloseButton = true,
  backgroundColor = 'white',
  hasDim = true,
  color,
}: ModalProps) => {
  if (!modalRoot) return null;

  return (
    isOpen &&
    createPortal(
      <FocusTrap onEscapeFocusTrap={onClose}>
        <S.ModalWrapper open={isOpen}>
          {hasDim && <S.ModalBackground onClick={hasDim ? onClose : () => {}} hasDim={hasDim} />}
          <S.ModalOuter $position={position} $size={size} color={color} isOpen={isOpen}>
            <S.ModalInner isOpen={isOpen} backgroundColor={backgroundColor}>
              {children}
              {hasCloseButton && (
                <S.CloseButton role="button" onClick={onClose} aria-label="모달 끄기">
                  <CloseIcon />
                </S.CloseButton>
              )}
            </S.ModalInner>
          </S.ModalOuter>
        </S.ModalWrapper>
      </FocusTrap>,
      modalRoot,
    )
  );
};

Modal.header = ModalHeader;
Modal.footer = ModalFooter;
Modal.body = ModalBody;

export default Modal;

const S = {
  ModalWrapper: styled.aside<{ open: boolean }>`
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.MODAL};

    width: 100%;
    height: 100dvh;
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
    ${flexColumn};
    align-items: flex-start;

    position: fixed;
    ${({ $position, $size }) => positionStyles[$position]($size)}
  `,
  ModalInner: styled.div<{ isOpen: boolean; backgroundColor: string }>`
    overflow: scroll;
    position: relative;
    width: 100%;
    padding: 1.6rem;

    background-color: ${({ backgroundColor }) => backgroundColor};

    color: ${({ theme }) => theme.color.mono.black};

    animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s forwards;
    border-radius: 1rem;
    box-shadow: 0 0.2rem 1rem rgb(0 0 0 / 40%);
    min-height: 15rem;
    max-height: 80vh;
  `,
  CloseButton: styled.button`
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
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
    border-radius: 0.8rem;
    width: ${$size === 'small' ? '60%' : '85%'};
    max-width: 45rem;
  `,
  bottom: ($size: ModalSize) => css`
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 1.6rem 1.6rem 0 0;
    width: ${$size && '100%'};
    max-width: 60rem;
    box-sizing: border-box;
  `,
};
