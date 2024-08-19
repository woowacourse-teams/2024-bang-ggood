import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { LocationLineIcon, SmileMessageIcon } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, flexCenter, flexColumn, flexRow, flexSpaceBetween, omitText, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';
import formattedUndefined from '@/utils/formattedUndefined';

interface Props {
  checklist: ChecklistPreview;
}

const ChecklistCard = ({ checklist }: Props) => {
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
        <S.Date>{formattedDate(createdAt ?? '')}</S.Date>
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
        <LikeButton isLiked={isLiked} checklistId={checklistId} />
      </S.Row>
    </S.Container>
  );
};

export default ChecklistCard;

const S = {
  Container: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 10px;
    box-sizing: border-box;
    border-radius: 8px;

    padding: 12px 16px;

    background-color: white;

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

    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Date: styled.p`
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Title: styled.p`
    ${title3}
    margin-bottom: 10px;
  `,
  Deposit: styled.p`
    ${title3}
    font-weight: ${({ theme }) => theme.text.size.medium};
  `,
  SummaryWrapper: styled.div`
    width: calc(100% - 50px);
    ${flexRow}
    align-items: center;
    padding: 4px;

    background-color: ${({ theme }) => theme.palette.grey100};
    border-radius: 10px;

    max-width: 400px;
  `,
  SummaryBox: styled.div`
    box-sizing: content-box;
    padding-left: 4px;

    ${omitText};
    border-radius: 4px;

    @media (width >= 500px) {
      font-size: ${({ theme }) => theme.text.size.medium};
    }
  `,
};
