import styled from '@emotion/styled';

import { flexCenter, flexSpaceBetween, title2 } from '@/styles/common';

type Position = 'left' | 'center';
interface TitleProps
  extends React.PropsWithChildren<{
    title?: string;
    position?: Position;
  }> {}

const ModalHeader = ({ title, children, position = 'left' }: TitleProps) => {
  return (
    <S.Container position={position}>
      {title && <S.Title>{title}</S.Title>}
      {children}
    </S.Container>
  );
};

const Container = styled.div<{ position: Position }>`
  ${flexSpaceBetween}
  align-items: ${({ position }) => (position === 'center' ? 'center' : 'flex-start')};
  flex-direction: ${({ position }) => position === 'center' && 'column'};
  width: calc(100% - 64px);
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 0 16px;

  line-height: normal;
  ${flexCenter}
  min-height: 45px;
`;

const Title = styled.span`
  height: 30px;
  ${flexCenter}
  margin-bottom: 16px;
  padding-top: 20px;

  ${title2}
  text-align: left;
`;

const S = {
  Container,
  Title,
};

export default ModalHeader;
