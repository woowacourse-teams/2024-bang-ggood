import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Logo from '@/assets/logo.svg';

const HeaderWithLogo = () => {
  return (
    <S.Wrapper>
      <Link to="/">
        <Logo />
      </Link>
    </S.Wrapper>
  );
};
export default HeaderWithLogo;

const S = {
  Wrapper: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 24px;
    box-sizing: border-box;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};
