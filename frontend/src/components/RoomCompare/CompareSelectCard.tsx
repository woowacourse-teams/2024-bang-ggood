import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Checkbox from '@/components/_common/Checkbox/Checkbox';
import Text from '@/components/_common/Text/Text';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
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
            <Text typography={font => font.headline[2].R} color={color => color.gray[400]}>
              {formattedUndefined(address, 'string')}
            </Text>
          </S.LocationWrapper>
          <Text typography={font => font.headline[2].R}>{roomName}</Text>
          <Text typography={font => font.headline[2].R}>
            {formattedUndefined(deposit)} / {formattedUndefined(rent)}
          </Text>
        </S.FlexColumn>
      </S.FlexRow>
      <S.SummaryWrapper>
        <Text typography={font => font.headline[2].R}>{`"${formattedUndefined(room.summary, 'string')}"`}</Text>
      </S.SummaryWrapper>
    </S.Card>
  );
};

export default CompareSelectCard;

const S = {
  Card: styled.div<{ isSelected: boolean }>`
    ${flexColumn}
    padding: 1.4rem 1.8rem;
    border: 2px solid ${({ isSelected, theme }) => (isSelected ? theme.color.primary[500] : theme.color.mono.white)};
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.color.mono.white};
    row-gap: 2.4rem;
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

    background-color: ${({ theme }) => theme.color.gray[50]};
    border-radius: 0.6rem;
    box-sizing: content-box;
  `,

  LocationWrapper: styled.p`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  HeaderContainer: styled.div`
    ${flexRow}
    ${flexSpaceBetween}
  `,
  FlexRow: styled.div<{ gap?: string; width?: string }>`
    ${flexRow}
    align-items: center;
    gap: ${({ gap }) => (gap ? gap : '4%')};
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
