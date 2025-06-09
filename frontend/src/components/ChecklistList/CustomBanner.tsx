import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import { flexCenter, flexRow } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

interface Props {
  onClick?: () => void;
  title: string;
  backgroundColor?: string;
  buttonText: string;
  buttonDetailText: string;
  Icon: React.ReactElement;
}

const CustomBanner = ({ onClick, Icon, title, buttonText, buttonDetailText, backgroundColor }: Props) => {
  return (
    <S.Banner onClick={onClick} $backgroundColor={backgroundColor}>
      <S.Wrapper>
        {Icon}
        <S.Title>{title}</S.Title>
      </S.Wrapper>
      <Button label={buttonText} aria-label={buttonDetailText} size="xSmall" />
    </S.Banner>
  );
};

export default CustomBanner;

const S = {
  Banner: styled.div<{ $backgroundColor?: string }>`
    ${flexCenter}

    width: 100%;
    height: 7.8rem;
    padding: 1.6rem;

    border-radius: 0.8rem;

    background-color: ${({ theme, $backgroundColor }) => ($backgroundColor ? $backgroundColor : theme.color.gray[200])};

    box-sizing: border-box;
    justify-content: space-between;
    gap: 0.5rem;
  `,
  Wrapper: styled.div`
    ${flexRow}
    gap: .8rem;
  `,
  Title: styled.span`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
};
