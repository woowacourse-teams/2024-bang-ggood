import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Badge from '@/components/common/Badge/Badge';
import { MAX_BADGE_DISPLAY_COUNT } from '@/constants/system';
import { boxShadow, flexCenter, flexColumn, flexRow, flexSpaceBetween, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';

interface Props {
  checklist: ChecklistPreview;
  onClick: () => void;
}

const ChecklistPreviewCard = ({ checklist, onClick }: Props) => {
  const { roomName, address, createdAt, deposit, rent, badge } = checklist;
  const extraBadgeCount = badge.length > MAX_BADGE_DISPLAY_COUNT ? badge.length - MAX_BADGE_DISPLAY_COUNT : null;

  return (
    <S.Container onClick={onClick}>
      <S.Row>
        <S.LocationWrapper>
          <LocationLineIcon />
          {address}
        </S.LocationWrapper>
        <S.Date>{formattedDate(createdAt)}</S.Date>
      </S.Row>
      <S.Row>
        <S.Column>
          <S.Title>{roomName}</S.Title>
          <S.Deposit>
            {deposit}/{rent}
          </S.Deposit>
        </S.Column>
        <S.BadgeWrapper>
          {badge.slice(0, MAX_BADGE_DISPLAY_COUNT).map((bd, count) => (
            <Badge key={count} label={bd.shortName} />
          ))}
          {extraBadgeCount && <S.ExtraBadgeBox>+{extraBadgeCount}</S.ExtraBadgeBox>}
        </S.BadgeWrapper>
      </S.Row>
    </S.Container>
  );
};

export default ChecklistPreviewCard;

const S = {
  Container: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 15px;
    box-sizing: border-box;
    border-radius: 8px;

    padding: 16px;
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
  BadgeWrapper: styled.div`
    ${flexRow}
    justify-content: flex-end;
    flex-wrap: wrap;
    height: auto;

    max-width: 60%;
    gap: 5px;
  `,
  ExtraBadgeBox: styled.div`
    ${flexCenter}
    height: 26px;
    padding: 0 6px;

    box-sizing: border-box;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};

    background-color: ${({ theme }) => theme.palette.grey100};

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};
