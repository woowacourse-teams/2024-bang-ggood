import styled from '@emotion/styled';

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalFooter;

const S = {
  Container: styled.div`
    display: flex;
    width: calc(100% - 3.2rem);
    padding: 1.6rem;
    justify-content: end;

    gap: 1rem;
  `,
};
