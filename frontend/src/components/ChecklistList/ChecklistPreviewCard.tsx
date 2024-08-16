import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { LocationLineIcon, SmileMessageIcon } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, flexCenter, flexColumn, flexRow, flexSpaceBetween, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';
import formattedUndefined from '@/utils/formattedUndefined';

interface Props {
  checklist: ChecklistPreview;
}

const ChecklistPreviewCard = ({ checklist }: Props) => {
  const navigate = useNavigate();
  const { checklistId, roomName, address, createdAt, deposit, rent, summary, isLiked } = checklist;

  const handleMoveToDetail = () => {
    navigate(ROUTE_PATH.checklistOne(checklist.checklistId));
  };

  return (
    <S.Container onClick={handleMoveToDetail}>
      <S.Row>
        <S.LocationWrapper>
          <LocationLineIcon />
          {address}
        </S.LocationWrapper>
        <LikeButton isLiked={isLiked} checklistId={checklistId} />
      </S.Row>
      <S.Column>
        <S.Title>{roomName}</S.Title>
        <S.Deposit>
          {formattedUndefined(deposit)} / {formattedUndefined(rent)}
        </S.Deposit>
      </S.Column>
      <S.Row>
        <S.SummaryWrapper>
          <SmileMessageIcon />
          <S.SummaryBox>{formattedUndefined(summary)}</S.SummaryBox>
        </S.SummaryWrapper>
        <S.Date>{formattedDate(createdAt ?? '')}</S.Date>
      </S.Row>
    </S.Container>
  );
};

export default ChecklistPreviewCard;

const S = {
  Container: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 10px;
    box-sizing: border-box;
    border-radius: 8px;

    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.palette.grey200};

    letter-spacing: 0.05rem;
    ${boxShadow}
  `,
  Row: styled.div`
    ${flexSpaceBetween}
    align-items: baseline;
  `,
  Column: styled.div`
    ${flexColumn}
  `,
  LocationWrapper: styled.p`
    ${flexCenter}
    gap: 5px;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Date: styled.p`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Title: styled.p`
    ${title3}
    margin-bottom: 10px;
  `,
  Deposit: styled.p`
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  SummaryWrapper: styled.div`
    ${flexRow}
    align-items: center;
    gap: 5px;
  `,
  SummaryBox: styled.div`
    box-sizing: content-box;
    padding: 8px;

    background-color: ${({ theme }) => theme.palette.grey100};

    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 4px;
  `,
};
