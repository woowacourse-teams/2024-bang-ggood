import styled from '@emotion/styled';

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalFooter;

const S = {
  Container: styled.div`
    display: flex;
    width: calc(100%);
    box-sizing: border-box;
    margin-bottom: 0.8rem;
    justify-content: end;

    gap: 1rem;
  `,
};
