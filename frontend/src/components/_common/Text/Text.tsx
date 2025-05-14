import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import color, { default as colorObj } from '@/styles/color';
import { default as fontObj, FontSet } from '@/styles/font';
import { fontStyle } from '@/utils/fontStyle';

interface Props extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  typography: (fontObject: typeof fontObj) => FontSet;
  color?: (colorObj: typeof color) => string;
  customCss?: SerializedStyles;
  children: React.ReactNode;
}

function Text({ typography, color, children, customCss, ...rest }: Props) {
  return (
    <S.Text fontSet={typography(fontObj)} color={color?.(colorObj) ?? colorObj.mono.black} css={customCss} {...rest}>
      {children}
    </S.Text>
  );
}

const S = {
  Text: styled.div<{ fontSet: FontSet; color: string; css?: SerializedStyles }>`
    ${({ fontSet }) => fontStyle(fontSet)}
    color: ${({ color }) => color};
    ${({ css }) => css}
  `,
};

export default Text;
