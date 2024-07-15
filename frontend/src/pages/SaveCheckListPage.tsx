import styled from '@emotion/styled';

import BangGgoodIcon from '@/assets/bang-ggood-icon.svg';
import HeaderWithLogo from '@/components/HeaderWithLogo';

const SaveCheckListPage = () => {
  return (
    <>
      <HeaderWithLogo />
      <S.Wrapper>
        <S.Text> 체크리스트가 저장되었습니다</S.Text>
        <BangGgoodIcon />
      </S.Wrapper>
    </>
  );
};

export default SaveCheckListPage;

const S = {
  Wrapper: styled.div`
    width: 100%;
    height: 80vh;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.div`
    font-size: ${({ theme }) => theme.text.size.large};
    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
};
