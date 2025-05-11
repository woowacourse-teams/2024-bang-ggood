import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ArrowRightIcon } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { VOC_URL } from '@/constants/VoC';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

const GuestFeature = () => {
  const navigate = useNavigate();
  const handleMoveVoc = () => {
    window.location.href = VOC_URL;
  };

  return (
    <>
      <S.TopLabelContainer>
        <span>방끗을 더 잘 사용하기 위해 로그인해보세요!</span>
      </S.TopLabelContainer>
      <S.Container>
        <S.Section>
          <S.LabelContainer>방끗이 도움되었나요? 한마디 남겨주세요!</S.LabelContainer>
          <S.Button tabIndex={1} isCenter onClick={handleMoveVoc}>
            방끗이 기다려요, 의견 남기기!
            <ArrowRightIcon aria-hidden="true" />
          </S.Button>
        </S.Section>

        <S.Section>
          <S.LabelContainer>방끗 시작하기!</S.LabelContainer>
          <S.Button onClick={() => navigate(ROUTE_PATH.root)} isCenter isBlack tabIndex={1}>
            로그인/회원가입 바로가기
            <ArrowRightIcon aria-hidden="true" style={{ filter: 'invert(1)' }} />
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
    gap: 2.5rem;
    padding: 2.8rem 1.6rem 3.2rem 1.6rem;
  `,
  Section: styled.section`
    ${flexColumn}
    gap: 0.8rem;
  `,
  LabelContainer: styled.div`
    ${flexColumn}
    gap: .5rem;
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
  TopLabelContainer: styled.div`
    ${flexColumn}
    gap: .5rem;
    padding: 1.2rem 1.6rem;
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
  Button: styled.button<{ isCenter?: boolean, isBlack?:boolean }>`
    width: 100%;
    ${flexRow}
    padding: 1.2rem 1.6rem;
    box-sizing: border-box;
    gap: 0.8rem;
    align-items: center;
    background-color: ${({ theme, isBlack }) => (isBlack ? theme.color.mono.black : theme.color.mono.white)};
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'space-between')};
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.color.gray[200]};
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color: ${({ theme, isBlack }) => (isBlack ? theme.color.mono.white : theme.color.mono.black)};

    &:hover, &:active {
        background-color: ${({ theme }) => theme.color.gray[100]};
        font-weight: ${({ theme }) => theme.text.weight.bold};
    }
  `,
  TextButton: styled.button`
    width: fit-content;
    margin-top: 1rem;

    color: ${({ theme }) => theme.color.gray[500]};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[500]};
  `,
};
