import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Checkbox from '@/components/_common/Checkbox/Checkbox';
import { flexColumn, flexRow, flexSpaceBetween, omitText, title3 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';
import { formattedUndefined } from '@/utils/formattedUndefined';

interface Props {
  isSelected: boolean;
  toggleSelectChecklist: (roomId: number) => void;
  room: ChecklistPreview;
}

const CompareSelectCard = ({ isSelected, toggleSelectChecklist, room }: Props) => {
  const { roomName, address, deposit, rent, checklistId } = room;

  return (
    <S.Card onClick={() => toggleSelectChecklist(checklistId)} isSelected={isSelected}>
      <S.FlexRow>
        <S.CheckboxContainer>
          <Checkbox isChecked={isSelected} />
        </S.CheckboxContainer>
        <S.FlexColumn>
          <S.LocationWrapper>
            <LocationLineIcon aria-hidden="true" />
            {formattedUndefined(address, 'string')}
          </S.LocationWrapper>
          <S.Title>{roomName}</S.Title>
          <S.Deposit>
            {formattedUndefined(deposit)} / {formattedUndefined(rent)}
          </S.Deposit>
          <S.SummaryWrapper>
            <S.SummaryBox>{`"${formattedUndefined(room.summary, 'string')}"`}</S.SummaryBox>
          </S.SummaryWrapper>
        </S.FlexColumn>
      </S.FlexRow>
    </S.Card>
  );
};

const S = {
  Card: styled.div<{ isSelected: boolean }>`
    ${flexColumn}
    padding: 14px 18px;
    border: 2px solid ${({ isSelected, theme }) => (isSelected ? theme.palette.green300 : theme.palette.grey200)};
    border-radius: 10px;

    background-color: ${({ isSelected, theme }) => (isSelected ? theme.palette.green50 : theme.palette.white)};
    row-gap: 5px;
    cursor: pointer;
  `,
  CheckboxContainer: styled.div`
    width: 4rem;
  `,
  Row: styled.div`
    ${flexSpaceBetween}
    align-items: center;
  `,
  Column: styled.div`
    ${flexColumn}
  `,
  SummaryWrapper: styled.div`
    align-items: center;
    padding: 0.8rem;

    background-color: ${({ theme }) => theme.palette.grey50};
    border-radius: 0.6rem;
    box-sizing: content-box;
  `,
  SummaryBox: styled.div`
    box-sizing: content-box;
    ${omitText};
    border-radius: 0.4rem;

    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Title: styled.p`
    ${title3}
  `,
  Deposit: styled.p`
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  LocationWrapper: styled.p`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  HeaderContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
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
    gap:0.5rem;
    width: 100%;
    height: 100%;
  `,
};

export default CompareSelectCard;
