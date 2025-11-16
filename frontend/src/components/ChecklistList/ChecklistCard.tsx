import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { EmptyHomeIcon } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter, flexColumn, flexSpaceBetween, omitText } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import { fontStyle } from '@/utils/fontStyle';
import formattedDate from '@/utils/formattedDate';
import { formattedUndefined } from '@/utils/formattedUndefined';

interface Props {
  checklist: ChecklistPreview;
}
const ChecklistCard = ({ checklist }: Props) => {
  const navigate = useNavigate();
  const { checklistId, roomName, thumbnail, address, createdAt, deposit, rent, summary, isLiked } = checklist;

  const handleMoveToDetail = () => {
    navigate(ROUTE_PATH.checklistOne(checklist.checklistId));
  };

  return (
    <S.Container data-testid="checklist-card" onClick={handleMoveToDetail} tabIndex={1}>
      <S.Row>
        <S.Row gap="1rem">
          <div>{thumbnail ? <S.ThumbnailImg src={thumbnail} /> : <EmptyHomeIcon aria-hidden="true" />}</div>

          <S.Column>
            <S.Location>{formattedUndefined(address, 'string')}</S.Location>
            <S.Title>{roomName}</S.Title>
            <S.Deposit>
              {formattedUndefined(deposit)} / {formattedUndefined(rent)}
            </S.Deposit>
          </S.Column>
        </S.Row>

        <LikeButton isLiked={isLiked} checklistId={checklistId} />
      </S.Row>

      <S.Row>
        <S.GrayBox>
          <S.Summary>
            {formattedUndefined(summary, 'string')?.toString().length > 23
              ? `${formattedUndefined(summary, 'string')?.toString().slice(0, 20)}…`
              : formattedUndefined(summary, 'string')}
          </S.Summary>
          <S.Date>{formattedDate(createdAt ?? '')}</S.Date>
        </S.GrayBox>
      </S.Row>
    </S.Container>
  );
};

export default ChecklistCard;

const S = {
  Container: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 1rem;
    border-radius: 0.8rem;
    padding: 1.6rem;
    border: ${({ theme }) => `1px solid ${theme.color.gray[200]}`};

    background-color: ${({ theme }) => theme.color.mono.white};
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.color.gray[100]};
    }
  `,
  Row: styled.div<{ gap?: string }>`
    ${flexSpaceBetween}
    align-items: flex-start;
    gap: ${({ gap }) => gap};
  `,
  Column: styled.div`
    ${flexColumn}
    gap: .5rem;
  `,
  ThumbnailImg: styled.img`
    width: 6.8rem;
    height: 6.8rem;
    border-radius: 50%;
    object-fit: cover;
  `,
  Location: styled.p`
    ${flexCenter}
    gap: .5rem;

    ${({ theme }) => fontStyle(theme.font.label[1].R)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
  Title: styled.p`
    ${({ theme }) => fontStyle(theme.font.headline[2].B)}
  `,
  Deposit: styled.p`
    ${({ theme }) => fontStyle(theme.font.headline[2].R)}
  `,
  GrayBox: styled.div`
    width: 100%;
    ${flexSpaceBetween}
    padding: 0.6rem 0.8rem;

    background-color: ${({ theme }) => theme.color.gray[100]};
    border-radius: 0.4rem;
  `,
  Summary: styled.span`
    ${omitText};
    border-radius: 0.4rem;

    ${({ theme }) => fontStyle(theme.font.headline[2].R)}
  `,
  Date: styled.span`
    color: ${({ theme }) => theme.color.gray[400]};
    ${({ theme }) => fontStyle(theme.font.headline[2].R)}
  `,
};
