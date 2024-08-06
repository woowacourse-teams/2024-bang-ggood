import styled from '@emotion/styled';

import { flexCenter, flexSpaceBetween, title2 } from '@/styles/common';

interface TitleProps
  extends React.PropsWithChildren<{
    title?: string;
  }> {}

const ModalHeader = ({ title, children }: TitleProps) => {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}
      {children}
    </S.Container>
  );
};

const Container = styled.div`
  ${flexSpaceBetween}

  ${flexCenter}
  align-items: flex-start;
  width: calc(100% - 32px);
  height: 60px;
  padding: 0 16px;
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
