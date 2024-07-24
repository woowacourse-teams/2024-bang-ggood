import styled from '@emotion/styled';

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalFooter;

const Container = styled.div`
  display: flex;
  width: calc(100% - 32px);
  padding: 16px;
  justify-content: end;

  gap: 10px;
`;

const S = {
  Container,
};
