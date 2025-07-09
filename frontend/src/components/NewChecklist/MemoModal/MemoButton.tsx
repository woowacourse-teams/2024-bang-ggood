import styled from '@emotion/styled';

import { CameraIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import { flexCenter } from '@/styles/common';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textOpen?: () => void;
  photoOpen?: () => void;
}

const MemoButton = ({ textOpen, photoOpen }: Props) => {
  return (
    <S.Wrapper>
      <S.CameraButtonWrapper onClick={photoOpen}>
        <CameraIcon />
      </S.CameraButtonWrapper>
      <S.MemoButtonWrapper>
        <Button label="메모" onClick={textOpen} rounded size="full" />
      </S.MemoButtonWrapper>
    </S.Wrapper>
  );
};

export default MemoButton;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    gap: 1rem;
    position: fixed;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};

    width: 100%;
    max-width: 60rem;
    height: 8rem;

    background-color: ${({ theme }) => theme.color.gray[200]};
    border-radius: 1.2rem 1.2rem 0 0;
  `,
  CameraButtonWrapper: styled.button`
    ${flexCenter}
    padding: 1rem;

    background-color: ${({ theme }) => theme.color.mono.black};
    border-radius: 99rem;
  `,
  MemoButtonWrapper: styled.div`
    width: 80%;
  `,
};
