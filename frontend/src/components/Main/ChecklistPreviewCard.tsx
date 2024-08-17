import styled from '@emotion/styled';

import HomeCircle from '@/assets/icons/common/HomeCircle';
import { flexColumn, flexRow, flexSpaceBetween, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import getSeqColor from '@/utils/getSeqColor';

interface Props {
  index: number;
  checklist: ChecklistPreview;
}

const ChecklistPreviewCard = ({ index, checklist }: Props) => {
  const colorList = ['green', 'blue', 'red'];
  const { color200, color500 } = getSeqColor(index, colorList);

  return (
    <S.Container>
      <HomeCircle color={color500} bgColor={color200} />
      <S.Column>
        <S.Label>
          {checklist.station} · {checklist.walkingTime}분
        </S.Label>
        <S.Row>
          <S.Title> {checklist.roomName}</S.Title>
          <div>
            {checklist.deposit} / {checklist.rent}
          </div>
        </S.Row>
      </S.Column>
    </S.Container>
  );
};

export default ChecklistPreviewCard;

const S = {
  Container: styled.div`
    width: 100%;
    ${flexRow};
    gap: 10px;

    padding: 4px 0;
    align-items: center;
  `,
  Column: styled.div`
    width: 100%;
    ${flexColumn}
    gap: 10px;
  `,
  Label: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Title: styled.div`
    ${title3}
  `,
  Row: styled.div`
    width: 100%;

    ${flexSpaceBetween}
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};
