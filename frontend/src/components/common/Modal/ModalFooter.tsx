import styled from '@emotion/styled';

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalFooter;

const Container = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

  gap: 10px;
`;

const S = {
  Container,
};
