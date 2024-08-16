import styled from '@emotion/styled';

import { CloseIcon } from '@/assets/assets';
import { TIP_MESSAGE } from '@/constants/message';
import useHandleTipBox, { TipType } from '@/hooks/useHandleTipBox';
import { flexCenter, title4 } from '@/styles/common';

interface Props {
  tipType: TipType;
}

const TipBox = ({ tipType }: Props) => {
  const { isTipOpen, closeTipBox } = useHandleTipBox(tipType);

  if (!isTipOpen) return;

  return (
    <S.TipBox>
      <S.TipText>
        💡 <S.Bold>TIP</S.Bold> : {TIP_MESSAGE[tipType]}
      </S.TipText>
      <CloseIcon onClick={closeTipBox} style={{ paddingRight: 10 }} />
    </S.TipBox>
  );
};

const S = {
  TipBox: styled.div`
    width: 100%;
    margin-top: 10px;
    ${flexCenter}
    justify-content: space-between;

    background-color: white;

    font-size: ${({ theme }) => theme.text.size.xSmall};
    line-height: 1.3;
    border-radius: 10px;
  `,
  TipText: styled.div`
    padding: 12px;
  `,
  Bold: styled.span`
    ${title4}
  `,
};

export default TipBox;
