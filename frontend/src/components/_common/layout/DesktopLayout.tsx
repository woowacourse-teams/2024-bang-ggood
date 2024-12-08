import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const DesktopLayout = ({ children }: Props) => {
  return <S.BodyWrapper>{children}</S.BodyWrapper>;
};

export default DesktopLayout;

const S = {
  BodyWrapper: styled.div`
    max-width: 120rem;
    min-height: 100dvh;

    margin: 0 auto;
    box-sizing: border-box;
  `,
};
