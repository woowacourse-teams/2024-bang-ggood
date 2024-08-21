import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexColumn, title1, title2 } from '@/styles/common';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTE_PATH.home);
  };

  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangCryIcon width={100} height={100} />
        <S.TextWrapper>
          <S.NotFound>404</S.NotFound>
          <S.Text> 접근할 수 없는 페이지입니다</S.Text>
          <Button label="홈으로 돌아가기" color="dark" onClick={handleClick} />
        </S.TextWrapper>
      </S.Wrapper>
    </>
  );
};

export default NotFound;

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    height: 80vh;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  NotFound: styled.div`
    ${title1}
  `,
  Text: styled.div`
    ${title2}
    margin-bottom: 4rem;
  `,
  TextWrapper: styled.div`
    ${flexColumn}
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  `,
};
