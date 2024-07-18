import styled from '@emotion/styled';

interface Props {
  isMarked: boolean;
}
const AccordionHeader = ({ isMarked }: Props) => {
  return <S.HeaderContainer>{isMarked && <S.HeaderMark />}</S.HeaderContainer>;
};

export default AccordionHeader;

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.white};
`;

const HeaderMark = styled.div`
  width: 12px;
  height: 100%;
  border-radius: 8px 0px 0px 8px;
  background-color: ${({ theme }) => theme.palette.yellow500};
`;

const S = {
  HeaderContainer,
  HeaderMark,
};
