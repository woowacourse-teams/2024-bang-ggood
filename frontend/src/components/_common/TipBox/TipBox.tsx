import styled from '@emotion/styled';

import { CloseIcon } from '@/assets/assets';
import { TIP_MESSAGE } from '@/constants/messages/message';
import useHandleTip, { TipType } from '@/hooks/useHandleTip';
import { flexCenter, flexSpaceBetween, title4 } from '@/styles/common';

interface Props {
  tipType: TipType;
  color?: 'white' | 'grey';
}

const TipBox = ({ tipType, color = 'white' }: Props) => {
  const { isTipOpen, closeTip } = useHandleTip(tipType);

  if (!isTipOpen) return;

  return (
    <S.TipBox color={color}>
      <S.TipText>
        <span aria-hidden="true">💡</span> <S.Bold>TIP</S.Bold> : {TIP_MESSAGE[tipType]}
      </S.TipText>
      <CloseIcon onClick={closeTip} style={{ paddingRight: 1 }} aria-label="클릭하면 팁박스가 삭제됩니다" />
    </S.TipBox>
  );
};

const S = {
  TipBox: styled.article<{ color?: 'white' | 'grey' }>`
    width: 100%;
    ${flexCenter}
    ${flexSpaceBetween}
    padding: 1.2rem;

    background-color: ${({ theme, color }) => (color === 'grey' ? theme.palette.grey100 : theme.palette.white)};

    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 1rem;
    box-sizing: border-box;
  `,
  TipText: styled.div`
    word-break: keep-all;
  `,
  Bold: styled.span`
    ${title4}
  `,
};

export default TipBox;
