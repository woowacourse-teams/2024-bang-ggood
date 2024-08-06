import styled from '@emotion/styled';

interface Props {
  bgColor?: string;
  children: React.ReactNode;
}

const Layout = ({ bgColor = 'white', children }: Props) => {
  return <S.Wrapper bgColor={bgColor}>{children}</S.Wrapper>;
};

export default Layout;

const S = {
  Wrapper: styled.div<{ bgColor: string }>`
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};
    overflow-y: scroll;
  `,
};
