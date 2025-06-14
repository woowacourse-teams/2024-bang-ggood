import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ArrowRightIcon } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { VOC_URL } from '@/constants/VoC';
import { flexColumn, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';
import Button from '@/components/_common/Button/Button';

const GuestFeature = () => {
  const navigate = useNavigate();
  const handleMoveVoc = () => {
    window.open(VOC_URL, "_blank");
  };

  return (
    <>
      <S.TopLabelContainer>
        <span>방끗을 더 잘 사용하기 위해 로그인해보세요!</span>
      </S.TopLabelContainer>
      <S.Container>
        <S.Section>
          <S.LabelContainer>방끗이 도움되었나요? 한마디 남겨주세요!</S.LabelContainer>
          <Button label={"방끗이 기다려요, 의견 남기기!"} color={"light"} onClick={handleMoveVoc} variant={"outlined-gray"} tabIndex={1} Icon={ArrowRightIcon} iconPosition={"end"}/>
        </S.Section>
        <S.Section>
          <S.LabelContainer>방끗 시작하기!</S.LabelContainer>
          <Button label={"로그인/회원가입 바로가기"} color={"dark"} onClick={() => navigate(ROUTE_PATH.root)} tabIndex={1} Icon={ArrowRightIcon} iconPosition={"end"}/>
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
    ${flexColumn};
    gap: 0.8rem;
  `,
  LabelContainer: styled.div`
    ${flexColumn};
    gap: .5rem;
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
  TopLabelContainer: styled.div`
    ${flexColumn};
    gap: .5rem;
    padding: 1.2rem 1.6rem;
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
  TextButton: styled.button`
    width: fit-content;
    margin-top: 1rem;

    color: ${({ theme }) => theme.color.gray[500]};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[500]};
  `,
};
