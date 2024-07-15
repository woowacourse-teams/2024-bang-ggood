import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import ArrowBack from '@/assets/arrow-back.svg';

// type HeaderStyle = 'Logo' | 'ArrowBack' | 'nothing';

// interface Props {
//   type?: HeaderStyle;
//   navigatePath: string;
// }

const Header = () =>
  //{ type = 'Logo', navigatePath }: Props

  {
    return (
      <S.Wrapper>
        <ArrowBack />
        <Link to="/saved">
          <S.TextButton>저장</S.TextButton>
        </Link>
      </S.Wrapper>
    );
  };
export default Header;

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
