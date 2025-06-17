import styled from '@emotion/styled';
import { CSSProperties, HTMLAttributes } from 'react';

import { flexColumn, flexRow } from '@/styles/common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  gap?: string | number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  pointer?: boolean;
  justify?: CSSProperties['justifyContent'];
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  flexWrap?: CSSProperties['flexWrap'];
}

const FlexBox = ({
  children,
  justify,
  align,
  gap,
  width,
  height,
  padding,
  margin,
  backgroundColor,
  pointer,
  style,
  flexWrap,
  ...props
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justify,
        alignItems: align,
        flexWrap: flexWrap ?? 'inherit',
        gap,
        width,
        height,
        padding,
        margin,
        backgroundColor,
        boxSizing: 'border-box',
        cursor: pointer ? 'pointer' : 'default',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

FlexBox.Vertical = styled(FlexBox)`
  ${flexColumn}
`;
FlexBox.Horizontal = styled(FlexBox)`
  ${flexRow}
  gap: ${({ gap }) => gap ?? '6%'};
  flex-wrap: ${({ flexWrap }) => flexWrap};
`;

export default FlexBox;
