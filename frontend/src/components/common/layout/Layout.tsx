import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default Layout;

const S = {
  Wrapper: styled.div`
    overflow-y: scroll;
    padding: 16px;
  `,
};
