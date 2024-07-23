import styled from '@emotion/styled';

import { title2 } from '@/styles/common';

interface TitleProps {
  title?: string;
}

const ModalHeader = ({ title }: TitleProps) => {
  return <S.Container>{title && <S.Title>{title}</S.Title>}</S.Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Title = styled.span`
  margin-bottom: 16px;

  ${title2}
  text-align: left;
`;

const S = {
  Container,
  Title,
};

export default ModalHeader;
