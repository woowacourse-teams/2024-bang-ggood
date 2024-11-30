import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import { boxShadow, flexCenter, flexRow } from '@/styles/common';

interface Props {
  onClick?: () => void;
  title: string;
  buttonColor: string;
  buttonText: string;
  Icon: React.ReactElement;
  buttonDetailText: string;
}

const CustomBanner = ({ onClick, Icon, title, buttonColor, buttonText, buttonDetailText }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <S.Wrapper>
        {Icon}
        <S.Title>{title}</S.Title>
      </S.Wrapper>
      <S.Button aria-label={buttonDetailText} label={buttonText} buttonColor={buttonColor} />
    </S.Banner>
  );
};

export default CustomBanner;

const S = {
  Banner: styled.div`
    ${flexCenter}

    width: 100%;
    height: 5rem;
    padding: 1.6rem;

    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};

    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    ${boxShadow};
  `,
  Wrapper: styled.div`
    ${flexRow}
    gap: .5rem;
  `,
  Title: styled.span`
    ${flexCenter}
  `,
  Button: styled(Button)<{ buttonColor: string }>`
    padding: 0.6rem 1rem;

    background-color: ${({ buttonColor }) => buttonColor};

    color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;

    font-size: ${({ theme }) => theme.text.size.small};

    cursor: pointer;
  `,
};
