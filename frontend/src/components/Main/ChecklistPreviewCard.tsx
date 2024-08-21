import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import HomeCircle from '@/assets/icons/common/HomeCircle';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexColumn, flexRow, flexSpaceBetween, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedUndefined from '@/utils/formattedUndefined';
import getSeqColor from '@/utils/getSeqColor';

interface Props {
  index: number;
  checklist: ChecklistPreview;
}

const ChecklistPreviewCard = ({ index, checklist }: Props) => {
  const navigate = useNavigate();
  const colorList = ['green', 'blue', 'red'];
  const { color200, color500 } = getSeqColor(index, colorList);

  const { checklistId, station, walkingTime, roomName, deposit, rent } = checklist;

  const handleClick = () => {
    navigate(ROUTE_PATH.checklistOne(checklistId));
  };

  return (
    <S.Container onClick={handleClick}>
      <HomeCircle color={color500} bgColor={color200} />
      <S.Column>
        <S.Label>
          {formattedUndefined(station)} · {formattedUndefined(walkingTime)}분
        </S.Label>
        <S.Row>
          <S.Title>{roomName}</S.Title>
          <div>
            {formattedUndefined(deposit)} / {formattedUndefined(rent)}
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
    gap: 1rem;

    padding: 0.4rem 0;
    align-items: center;
  `,
  Column: styled.div`
    width: 100%;
    ${flexColumn}
    gap: 1rem;
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