import styled from '@emotion/styled';

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
      <StyledHeader>
        <ArrowBack />
      </StyledHeader>
    );
  };
export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  padding: 24px;
`;
