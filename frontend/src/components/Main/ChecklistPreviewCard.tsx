import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { EmptyHomeIcon } from '@/assets/assets';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexColumn, flexRow } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import { fontStyle } from '@/utils/fontStyle';
import { formattedUndefined } from '@/utils/formattedUndefined';

interface Props {
  index: number;
  checklist: ChecklistPreview;
}

const ChecklistPreviewCard = ({ index, checklist }: Props) => {
  const { checklistId, thumbnail, station, roomName, deposit, rent, address } = checklist;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTE_PATH.checklistOne(checklistId));
  };

  const stationLabel = address
    ? `${formattedUndefined(station?.stationName)}역 · ${formattedUndefined(station?.walkingTime)}분`
    : '-역 · -분'; // TODO: address없을시 역이름에 선릉역을 넣었다가 버그생김. 임시해결을위해 address를 검사하고있지만, 제대로된방법을 쓰도록고쳐야함.

  return (
    <S.Container onClick={handleClick} tabIndex={1}>
      <div>{thumbnail ? <S.ThumbnailImg src={thumbnail} /> : <EmptyHomeIcon aria-hidden="true" />}</div>
      <S.Column>
        <div>
          <S.Label>{stationLabel}</S.Label>
          <S.Title>{roomName}</S.Title>
        </div>
        <S.Deposit>
          {formattedUndefined(deposit)} / {formattedUndefined(rent)}
        </S.Deposit>
      </S.Column>
    </S.Container>
  );
};

export default ChecklistPreviewCard;

const S = {
  Container: styled.div`
    width: 100%;
    height: 10rem;
    border-radius: 0.8rem;
    ${flexRow};
    align-items: center;
    gap: 1.6rem;

    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.palette.grey50};
      border-radius: 8px;
    }
  `,
  ThumbnailImg: styled.img`
    width: 6.8rem;
    height: 6.8rem;
    border-radius: 50%;
    object-fit: cover;
  `,
  Column: styled.div`
    flex-grow: 1;

    ${flexColumn}
    gap: .2rem;
  `,
  Label: styled.div`
    color: ${({ theme }) => theme.color.gray[400]};
    ${({ theme }) => fontStyle(theme.font.caption[1].R)}
  `,
  Title: styled.div`
    color: ${({ theme }) => theme.color.gray[600]};
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
  Deposit: styled.div`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
};
