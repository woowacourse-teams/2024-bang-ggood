import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

type BadgeType = 'short' | 'long' | 'button';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: BadgeType;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Badge = ({ type = 'short', label, isSelected = false, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <S.Button size={type} onClick={handleClick} isSelected={isSelected}>
      {label}
    </S.Button>
  );
};

export default Badge;

const S = {
  Button: styled.button<{ size: BadgeType; isSelected: boolean }>`
    ${flexCenter}
    border-radius: 20px;
    box-sizing: border-box;

    color: ${({ theme }) => theme.palette.grey600};
    ${({ size }) => typeStyles[size]}
    line-height: 1;
    cursor: pointer;

    ${({ isSelected }) =>
      isSelected
        ? `
        background-color: ${theme.palette.yellow200};
        border: 1px solid ${theme.palette.yellow600};
    `
        : `
        background-color: ${theme.palette.white};
        border: 1px solid ${theme.palette.grey300};
    `}
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
