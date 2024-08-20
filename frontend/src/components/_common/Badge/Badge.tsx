import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

type BadgeSize = 'short' | 'long' | 'button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BadgeSize;
  label: string;
  isSelected?: boolean;
  name?: string;
}

const Badge = ({ size = 'short', label, isSelected = false, onClick, name, ...rest }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <S.Button size={size} onClick={handleClick} isSelected={isSelected} name={name} {...rest}>
      {label}
    </S.Button>
  );
};

export default Badge;

const S = {
  Button: styled.button<{ size: BadgeSize; isSelected: boolean }>`
    ${flexCenter}
    border-radius: 2rem;
    box-sizing: border-box;

    color: ${({ theme }) => theme.palette.grey600};
    ${({ size }) => typeStyles[size]}
    line-height: 1;
    cursor: pointer;

    ${({ isSelected }) =>
      isSelected
        ? css`
            border: 0.2rem solid ${theme.palette.yellow500};

            background-color: ${theme.palette.yellow200};
          `
        : css`
            border: 0.2rem solid ${theme.palette.grey200};

            background-color: ${theme.palette.white};
          `}
  `,
};

const typeStyles = {
  short: css`
    height: 2.6rem;
    padding: 0.4rem 1rem;

    font-size: ${theme.text.size.xSmall};
  `,
  long: css`
    height: 3.2rem;
    padding: 0.4rem 1.6rem;

    font-size: ${theme.text.size.small};
  `,
  button: css`
    padding: 0.8rem 1.5rem;

    font-size: ${theme.text.size.medium};
  `,
};
