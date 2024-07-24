import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Badge from '@/components/common/Badge/Badge';
import { MAX_BADGE_DISPLAY_COUNT } from '@/constants/system';
import { boxShadow, flexCenter, flexColumn, flexSpaceBetween, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';

interface Props {
  checklist: ChecklistPreview;
}

const ChecklistPreviewCard = ({ checklist }: Props) => {
  const extraBadgeCount =
    checklist.badge.length > MAX_BADGE_DISPLAY_COUNT ? checklist.badge.length - MAX_BADGE_DISPLAY_COUNT : null;

  return (
    <S.Container>
      <S.Row>
        <S.LocationWrapper>
          <LocationLineIcon />
          {checklist.address}
        </S.LocationWrapper>
        <S.Date>{formattedDate(checklist.createAt)}</S.Date>
      </S.Row>
      <S.Row>
        <S.Column>
          <S.Title>{checklist.roomName}</S.Title>
          <S.Deposit>
            {checklist.deposit}/{checklist.rent}
          </S.Deposit>
        </S.Column>
        <S.BadgeWrapper>
          {checklist.badge.slice(0, MAX_BADGE_DISPLAY_COUNT).map(badge => (
            <Badge key={badge.badgeId} label={badge.badgeName.short} />
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
    align-items: baseline;
    ${flexSpaceBetween}
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
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    height: auto;

    max-width: 60%;
    gap: 5px;
  `,
  ExtraBadgeBox: styled.div`
    ${flexCenter}
    height: 26px;
    padding: 0 4px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};
