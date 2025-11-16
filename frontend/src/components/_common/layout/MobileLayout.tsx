import styled from '@emotion/styled';

import theme from '@/styles/theme';

interface Props {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: Props) => {
  return <S.BodyWrapper>{children}</S.BodyWrapper>;
};

export default MobileLayout;

const S = {
  BodyWrapper: styled.div`
    position: relative;
    max-width: 60rem;
    min-height: 100dvh;

    margin: 0 auto;
    box-sizing: border-box;

    border-left: 0.1rem solid ${theme.color.gray[200]};
    border-right: 0.1rem solid ${theme.color.gray[200]};
    box-shadow: 0 0 2rem ${theme.color.gray[100]};
  `,
};
