import styled from '@emotion/styled';
import { useState } from 'react';

import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

type BadgeType = 'short' | 'long' | 'button';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: BadgeType;
  label: string;
  onClick?: () => void;
}

const Badge = ({ type = 'short', label, onClick }: Props) => {
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setSelected(prev => !prev);
    }
  };

  return (
    <S.Button size={type} onClick={handleClick} isSelected={isSelected} hasOnClick={!!onClick}>
      {label}
    </S.Button>
  );
};

export default Badge;

const S = {
  Button: styled.button<{ size: BadgeType; isSelected: boolean; hasOnClick: boolean }>`
    ${flexCenter}
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};
    box-sizing: border-box;

    color: ${({ theme }) => theme.palette.grey600};
    ${({ size }) => typeStyles[size]}
    line-height: 1;
    cursor: pointer;

    ${({ isSelected }) =>
      isSelected &&
      `
        background-color: ${theme.palette.yellow200};
        border: 1px solid ${theme.palette.yellow600};
    `}

    ${({ hasOnClick }) =>
      hasOnClick &&
      `
        &:hover, &:active {
            background-color: ${theme.palette.yellow200};
            border: 1px solid ${theme.palette.yellow600};
      }
    `};
  `,
};

const typeStyles = {
  short: `
    height: 26px;
    padding: 4px 10px; 
    font-size: ${theme.text.size.xSmall};
  `,
  long: `
    height: 32px;
    padding: 4px 16px;
    font-size: ${theme.text.size.small};
  `,
  button: `
    padding: 8px 15px;

    font-size: ${theme.text.size.medium};
  `,
};
