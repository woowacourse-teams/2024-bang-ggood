import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

interface ToggleButtonProps extends ComponentProps<'button'> {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const ToggleButton = ({
  label,
  selected = false,
  onClick,
  disabled = false,
  size = 'medium',
  ...rest
}: ToggleButtonProps) => {
  return (
    <S.ToggleButton
      aria-pressed={selected}
      selected={selected}
      onClick={onClick}
      disabled={disabled}
      size={size}
      {...rest}
    >
      <span>{label}</span>
    </S.ToggleButton>
  );
};

export default ToggleButton;

const S = {
  ToggleButton: styled.button<{
    selected: boolean;
    size: 'small' | 'medium';
  }>`
    ${flexCenter};
    ${fontStyle(theme.font.body[1].B)};
    border-radius: 2.4rem;
    border: 1px solid ${({ selected }) => (selected ? theme.color.mono.black : theme.color.gray[300])};

    background-color: ${({ selected }) => (selected ? theme.color.mono.black : theme.color.mono.white)};

    color: ${({ selected }) => (selected ? theme.color.mono.white : theme.color.gray[500])};
    cursor: pointer;

    ${({ size }) =>
      size === 'small'
        ? css`
            min-width: 10rem;
            height: 3.6rem;
            padding: 0 1.2rem;
          `
        : css`
            min-width: 14rem;
            height: 4.2rem;
            padding: 0 1.6rem;
          `};

    &:hover {
      background-color: ${({ selected }) => (selected ? theme.color.gray[600] : theme.color.gray[100])};
    }

    &:disabled {
      background-color: ${theme.color.gray[200]};

      color: ${theme.color.gray[500]};
      border-color: ${theme.color.gray[200]};
      cursor: not-allowed;
    }
  `,
};
