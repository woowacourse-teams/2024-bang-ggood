import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentPropsWithRef } from 'react';
import { createPortal } from 'react-dom';

import { XIcon } from '@/assets/assets';
import ModalBody, { ModalContentPosition } from '@/components/common/Modal/ModalBody';
import ModalFooter from '@/components/common/Modal/ModalFooter';
import ModalHeader from '@/components/common/Modal/ModalHeader';
import { flexCenter } from '@/styles/common';

type ModalPosition = 'center' | 'bottom';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps extends ComponentPropsWithRef<'dialog'> {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  contentPosition?: ModalContentPosition;
  hasCloseButton: boolean;
  position?: ModalPosition;
}

const modalRoot = document.getElementById('modal');

const Modal = ({
  children,
  isOpen,
  position = 'center',
  onClose,
  hasCloseButton = true,
  size = 'large',
}: ModalProps) => {
  if (!modalRoot) return null;

  return createPortal(
    <S.ModalWrapper open={isOpen}>
      <S.ModalBackground onClick={onClose} />
      <S.ModalOuter $position={position} $size={size}>
        <S.ModalInner>
          {children}
          {hasCloseButton && (
            <S.CloseIcon>
              <XIcon onClick={onClose} />
            </S.CloseIcon>
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

const ModalBottomStyle = css`
  top: auto;
  bottom: 0;
  width: 100%;
  transform: translate(-50%);
  border-radius: 8px 8px 0 0;
`;

const ModalCenterStyle = css`
  transform: translate(-50%, -50%);
  top: 50%;
`;

// const MODAL_WIDTH_MAP: Record<ModalSize, string> = {
//   small: '320px',
//   medium: '480px',
//   large: '600px',
// };

const ModalWrapper = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex['LEVEL-2']};
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  border-radius: 8px;
  ${({ $position }) => {
    if ($position === 'bottom') return ModalBottomStyle;
    return ModalCenterStyle;
  }};
  width: 100vw;

  background-color: white;
  ${flexCenter}

  max-width: 390px;
`;

const ModalInner = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;

  border-radius: 5px;
`;

const CloseIcon = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;

  background-color: transparent;

  color: black;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const S = { ModalWrapper, ModalBackground, ModalOuter, ModalInner, CloseIcon };
