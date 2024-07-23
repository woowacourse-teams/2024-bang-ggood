import styled from 'styled-components';

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
`;

const Title = styled.span`
  margin-bottom: 16px;

  font-weight: bold;
  font-size: 24px;
  text-align: left;
`;

const S = {
  Container,
  Title,
};

export default ModalHeader;
