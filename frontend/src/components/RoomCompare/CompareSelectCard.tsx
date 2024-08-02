import styled from '@emotion/styled';

import { LocationLineIcon } from '@/assets/assets';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';

interface Props {
  isSelected: boolean;
  onClick?: () => void;
}

const roomData = {
  roomName: '루터 오피스텔',
  location: '서울 관악구',
  deposit: 2000,
  rent: 56,
  createDate: new Date(),
};

const CompareSelectCard = ({ isSelected, onClick }: Props) => {
  return (
    <S.Card onClick={onClick}>
      <S.FlexRow>
        <div>
          <Checkbox isChecked={isSelected} />
        </div>
        <S.FlexColumn>
          <S.HeaderContainer>
            <S.FlexRow gap="4px">
              <LocationLineIcon />
              <p>{roomData.location}</p>
            </S.FlexRow>
            <label>{`${roomData.createDate.getFullYear()}.${roomData.createDate.getMonth() + 1}.${roomData.createDate.getDate()}`}</label>
          </S.HeaderContainer>
          <S.Title>{roomData.roomName}</S.Title>
          <S.RentPrice>{`${roomData.deposit}/${roomData.rent}`}</S.RentPrice>
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
