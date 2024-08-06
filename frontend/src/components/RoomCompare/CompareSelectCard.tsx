import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Checkbox from '@/components/_common/Checkbox/Checkbox';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';

interface Props {
  isSelected: boolean;
  onClick?: () => void;
  room: ChecklistPreview;
}

const CompareSelectCard = ({ isSelected, onClick, room }: Props) => {
  const { roomName, address, deposit, rent, createdAt } = room;

  return (
    <S.Card onClick={onClick}>
      <S.FlexRow>
        <div>
          <Checkbox isChecked={isSelected} setIsChecked={() => {}} />
        </div>
        <S.FlexColumn>
          <S.HeaderContainer>
            <S.FlexRow gap="4px">
              <LocationLineIcon />
              <p>{address}</p>
            </S.FlexRow>
            <label>{`${formattedDate(createdAt, '.')}`}</label>
          </S.HeaderContainer>
          <S.Title>{roomName}</S.Title>
          <S.RentPrice>{`${deposit}/${rent}`}</S.RentPrice>
        </S.FlexColumn>
      </S.FlexRow>
    </S.Card>
  );
};

const S = {
  Card: styled.div`
    ${flexColumn}
    height: 80px;
    padding: 14px 18px;
    border: 2px solid ${({ theme }) => theme.palette.grey200};
    border-radius: 10px;

    background-color: white;
    row-gap: 5px;
    cursor: pointer;
  `,
  HeaderContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
  `,
  Title: styled.h4`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  RentPrice: styled.p`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  FlexRow: styled.div<{ gap?: string; width?: string }>`
    ${flexRow}
    align-items: center;
    column-gap: ${({ gap }) => (gap ? gap : '4%')};
    ${({ width }) => width && `width:${width}`};
    height: 100%;
  `,

  FlexColumn: styled.div`
    ${flexColumn}
    justify-content: space-between;
    width: 100%;
    height: 100%;
  `,
};

export default CompareSelectCard;
