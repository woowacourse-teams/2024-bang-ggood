import styled from '@emotion/styled';

// import ArrowBack from '@/assets/arrow-back.svg';
import Logo from '@/assets/logo.svg';

// type HeaderStyle = 'Logo' | 'ArrowBack' | 'nothing';

// interface Props {
//   type?: HeaderStyle;
//   navigatePath: string;
// }

const Header = ({ Button }: { Button?: React.ReactNode }) => {
  return (
    <S.Wrapper>
      <Logo />
      {Button}
    </S.Wrapper>
  );
};
export default Header;

const S = {
  Wrapper: styled.header`
    display: flex;
    width: 100%;
    height: 64px;
    padding: 24px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
  `,
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.black};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};
