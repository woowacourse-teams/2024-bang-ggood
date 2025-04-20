import styled from '@emotion/styled';

import { CloseIcon, TipIcon } from '@/assets/assets';
import { TIP_MESSAGE } from '@/constants/messages/message';
import useHandleTip, { TipType } from '@/hooks/useHandleTip';
import { flexCenter, flexSpaceBetween, title4 } from '@/styles/common';

interface Props {
  tipType: TipType;
}

const TipBox = ({ tipType }: Props) => {
  const { isTipOpen, closeTip } = useHandleTip(tipType);

  if (!isTipOpen) return;

  return (
    <S.TipBox>
      <S.TipText>
        <span aria-hidden="true">
          <TipIcon />
        </span>
        <S.Bold>Tip</S.Bold> : {TIP_MESSAGE[tipType]}
      </S.TipText>
      <CloseIcon onClick={closeTip} style={{ paddingRight: 1 }} aria-label="클릭하면 팁박스가 삭제됩니다" />
    </S.TipBox>
  );
};

const S = {
  TipBox: styled.article`
    width: 100%;
    ${flexCenter}
    ${flexSpaceBetween}
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};

    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 1rem;
    box-sizing: border-box;
  `,
  TipText: styled.div`
    ${flexCenter}
    word-break: keep-all;
    gap: 0.5rem;
  `,
  Bold: styled.span`
    ${title4}
  `,
};

export default TipBox;
