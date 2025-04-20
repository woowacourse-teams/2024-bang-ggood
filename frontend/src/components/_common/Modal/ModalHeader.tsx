import styled from '@emotion/styled';

import { flexCenter, flexSpaceBetween, title3 } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

type Position = 'left' | 'center';

interface Props extends React.PropsWithChildren {
  title?: string;
  position?: Position;
  tabIndex?: number;
}

const ModalHeader = ({ title, children, position = 'center', ...rest }: Props) => {
  return (
    <S.Container position={position} {...rest}>
      {title && <S.Title>{title}</S.Title>}
      {children}
    </S.Container>
  );
};

export default ModalHeader;

const S = {
  Container: styled.div<{ position: Position }>`
    width: 100%;
    box-sizing: border-box;

    ${flexSpaceBetween}
    flex-direction: ${({ position }) => position === 'center' && 'column'};
    margin-bottom: 1rem;
    padding: 0.4rem 1.6rem;

    min-height: 4.5rem;
    align-items: center;
    ${title3}
  `,
  Title: styled.span`
    height: 3rem;
    ${flexCenter}

    ${({ theme }) => fontStyle(theme.font.headline[1].B)}
    text-align: left;
  `,
};
