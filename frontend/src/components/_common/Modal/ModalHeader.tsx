import styled from '@emotion/styled';

import { flexCenter, flexSpaceBetween, title2, title3 } from '@/styles/common';

type Position = 'left' | 'center';

interface Props extends React.PropsWithChildren {
  title?: string;
  position?: Position;
  tabIndex?: number;
}

const ModalHeader = ({ title, children, position = 'left', ...rest }: Props) => {
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
    ${flexSpaceBetween}
    flex-direction: ${({ position }) => position === 'center' && 'column'};
    width: calc(100% - 6.4rem);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0 1.6rem;

    min-height: 4.5rem;
    align-items: center;
    ${title3}
  `,
  Title: styled.span`
    height: 3rem;
    ${flexCenter}
    margin-bottom: 1.6rem;
    padding-top: 2rem;

    ${title2}
    text-align: left;
  `,
};
