import styled from '@emotion/styled';

import Logo from '@/assets/logo.svg';

const HeaderWithLogo = () => {
  return (
    <S.Wrapper>
      <Logo />
    </S.Wrapper>
  );
};
export default HeaderWithLogo;

const S = {
  Wrapper: styled.header`
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    font-size: ${({ theme }) => theme.text.size.medium};
    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
};
