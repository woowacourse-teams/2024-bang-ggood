import styled from '@emotion/styled';

import theme from '@/styles/theme';

type Size = 'small' | 'medium' | 'extends';

type Color = 'yellow' | 'green' | 'subGreen';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: Size;
  color?: Color;
  'aria-label'?: string;
}

const FloatingButton = ({
  children,
  size = 'medium',
  color = 'yellow',
  'aria-label': ariaLabel = 'add',
  ...rest
}: Props) => {
  return (
    <S.Button size={size} color={color} aria-label={ariaLabel} {...rest}>
      {children}
    </S.Button>
  );
};

export default FloatingButton;

const sizeStyle ={
   small: { width: '40px', height: '40px', fontSize: '12px' },
   medium: { width: '60px', height: '60px', fontSize: '16px' },
   extends: { width: '100px', height: '40px', fontSize: '16px' },
};

const colorStyle = (color: Color) => {
  switch (color) {
    case 'yellow':
      return {
        backgroundColor: theme.palette.yellow500,
        '&:hover, &:active': {
          backgroundColor: theme.palette.yellow600,
        },
      };
    case 'green':
      return {
        backgroundColor: theme.palette.green500,
        '&:hover, &:active': {
          backgroundColor: theme.palette.green600,
        },
      };
    case 'subGreen':
      return {
        backgroundColor: theme.palette.subGreen500,
        '&:hover, &:active': {
          backgroundColor: theme.palette.subGreen600,
        },
      };
  }
};

const S = {
  Button: styled.button<{ size: Size; color: Color }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50px;

    ${({ size }) => sizeStyle(size)}
    ${({ color }) => colorStyle(color)}

    color: ${({ theme }) => theme.palette.white};
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    outline: none;
    cursor: pointer;
  `,
};
