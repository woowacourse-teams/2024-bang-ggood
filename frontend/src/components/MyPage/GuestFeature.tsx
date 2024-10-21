import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ArrowRightCircle } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { VOC_URL } from '@/constants/VoC';
import { boxShadowSpread, flexColumn, flexRow, flexSpaceBetween, title4 } from '@/styles/common';

const GuestFeature = () => {
  const navigate = useNavigate();
  const handleMoveVoc = () => {
    window.location.href = VOC_URL;
  };

  return (
    <>
      <S.Container>
        <S.LabelContainer>
          <span>방끗을 더 잘 사용하기 위해 로그인해보세요!</span>
        </S.LabelContainer>

        <S.Section>
          <S.LabelContainer>방끗이 도움되었나요? 한마디 남겨주세요!</S.LabelContainer>
          <S.Button tabIndex={1} onClick={handleMoveVoc}>
            방끗이 기다려요, 의견 남기기!
            <ArrowRightCircle aria-hidden="true" />
          </S.Button>
        </S.Section>

        <S.Section>
          <S.LabelContainer>방끗 시작하기!</S.LabelContainer>
          <S.Button onClick={() => navigate(ROUTE_PATH.root)} tabIndex={1}>
            로그인/회원가입 바로가기
            <ArrowRightCircle aria-hidden="true" />
          </S.Button>
        </S.Section>
      </S.Container>
    </>
  );
};

export default GuestFeature;

const S = {
  Container: styled.div`
    ${flexColumn}
    ${flexSpaceBetween}
    height: calc(40dvh);
    padding: 1.6rem;
  `,
  Section: styled.section`
    ${flexColumn}
    gap: 1rem;
  `,
  LabelContainer: styled.div`
    ${flexColumn}
    gap: .5rem;
    ${title4}
  `,
  Button: styled.button<{ isCenter?: boolean }>`
    width: 100%;
    ${flexRow}
    padding: 1.6rem;
    align-items: center;

    background-color: ${({ theme }) => theme.palette.white};

    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'space-between')};

    border-radius: 1.6rem;
    ${boxShadowSpread}

    &:hover, &:active {
      background-color: ${({ theme }) => theme.palette.grey100};

      font-weight: ${({ theme }) => theme.text.weight.bold};
    }
  `,
  TextButton: styled.button`
    width: fit-content;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey500};
  `,
};
