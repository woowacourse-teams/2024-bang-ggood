import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import ModalBody, { ModalContentPosition } from '@/components/common/Modal/ModalBody';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import ModalHeader from '@/components/common/Modal/ModalHeader';

type ModalPosition = 'center' | 'bottom' | 'top';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

interface ModalMainProps {
  children: React.ReactNode;
  buttons?: React.ReactNode;
  isOpen: boolean;
  position?: ModalPosition;
  onClose: () => void;
  size?: ModalSize;
  contentPosition?: ModalContentPosition;
}

const Modal = ({ children, isOpen, position = 'center', onClose, size = 'medium' }: ModalMainProps) => {
  return (
    <S.ModalWrapper open={isOpen}>
      <S.ModalBackground onClick={onClose} />
      <S.ModalOuter $position={position} $size={size}>
        <S.ModalInner>{children}</S.ModalInner>
      </S.ModalOuter>
    </S.ModalWrapper>
  );
};

Modal.header = ModalHeader;
Modal.footer = ModalFooter;
Modal.Body = ModalBody;

export default Modal;

const ModalBottomStyle = css`
  @media (width <= 567px) {
    top: auto;
    bottom: 0;
    width: 100%;
    transform: translate(-50%);
    border-radius: 8px 8px 0 0;
  }
`;

const ModalCenterStyle = css`
  @media (width <= 567px) {
    transform: translate(-50%, -50%);
    top: 50%;
  }
`;

const ModalTopStyle = css`
  @media (width <= 567px) {
    top: 0;
    width: 100%;
    transform: translate(-50%);
    border-radius: 0 0 8px 8px;
  }
`;

const MODAL_WIDTH_MAP: Record<ModalSize, string> = {
  small: '320px',
  medium: '480px',
  large: '600px',
  full: '100vw',
};

const ModalWrapper = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  z-index: 10;
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 35%);
`;

const ModalOuter = styled.div<{
  $position: ModalPosition;
  $size: ModalSize;
}>`
  position: fixed;
  left: 50%;

  background-color: white;

  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 150px;
  width: ${({ $size: size }) => MODAL_WIDTH_MAP[size]};

  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  ${({ $position }) => {
    if ($position === 'bottom') return ModalBottomStyle;
    if ($position === 'center') return ModalCenterStyle;
    return ModalTopStyle;
  }};
`;

const ModalInner = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  flex-direction: column;
  justify-content: 'flex-left';
`;

const CloseIcon = styled.button`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  padding: 0;

  background-color: transparent;

  color: black;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const S = { ModalWrapper, ModalBackground, ModalOuter, ModalInner };
