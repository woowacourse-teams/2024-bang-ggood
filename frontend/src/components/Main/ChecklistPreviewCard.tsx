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
  const colorList = ['green', 'blue', 'yellow'];
  const { color200, color500 } = getSeqColor(index, colorList);

  const { checklistId, station, roomName, deposit, rent, address } = checklist;

  const handleClick = () => {
    navigate(ROUTE_PATH.checklistOne(checklistId));
  };

  const stationLabel = address
    ? `${formattedUndefined(station?.stationName)}역 · ${formattedUndefined(station?.walkingTime)}분`
    : '-역 · -분'; // TODO: address없을시 역이름에 선릉역을 넣었다가 버그생김. 임시해결을위해 address를 검사하고있지만, 제대로된방법을 쓰도록고쳐야함.

  return (
    <S.Container onClick={handleClick} tabIndex={1}>
      <HomeCircle color={color500} bgColor={color200} aria-hidden="true" />
      <S.Column>
        <S.Label>{stationLabel}</S.Label>
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
    align-items: center;
    gap: 1rem;

    padding: 0.4rem 0;

    background-color: ${({ theme }) => theme.palette.white};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.palette.grey50};
      border-radius: 8px;
    }
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
