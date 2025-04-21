import styled from '@emotion/styled';

import { CloseIcon, TipIcon } from '@/assets/assets';
import { TIP_MESSAGE } from '@/constants/messages/message';
import useHandleTip, { TipType } from '@/hooks/useHandleTip';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

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
          <TipIcon width={12} />
        </span>
        <S.Bold>Tip</S.Bold> :<div>{TIP_MESSAGE[tipType]}</div>
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

    border-radius: 1rem;
    box-sizing: border-box;
  `,
  TipText: styled.div`
    ${flexRow}
    word-break: keep-all;
    ${({ theme }) => fontStyle(theme.font.caption[1].R)}
    gap: 1rem;
  `,
  Bold: styled.div`
    ${flexRow}
    ${({ theme }) => fontStyle(theme.font.caption[1].B)}
  `,
};

export default TipBox;
