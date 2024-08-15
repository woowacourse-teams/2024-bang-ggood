import styled from '@emotion/styled';

import { Building, Calendar, LocationLineIcon, Room, Stairs, Subway } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import { flexColumn, flexRow, flexSpaceBetween, title1 } from '@/styles/common';
import { RoomInfo } from '@/types/room';

interface Props {
  room: RoomInfo;
  checklistId: number;
  isLiked: boolean;
}

const RoomInfoSection = ({ room, checklistId, isLiked }: Props) => {
  // TODO: 로딩 중일 때 스켈레톤표시
  if (!room) return null;
  const {
    roomName,
    deposit,
    rent,
    fee,
    address,
    contractTerm,
    floor,
    floorLevel,
    station,
    walkingTime,
    realEstate,
    occupancyMonth,
    occupancyPeriod,
  } = room;

  return (
    <S.Container>
      <S.GreenWrapper>
        <S.Row>
          <S.Title>{roomName}</S.Title>
          <LikeButton isLiked={isLiked} checklistId={checklistId} />
        </S.Row>
        <S.Row>
          {deposit ?? '00'} / {rent ?? '00'} + {fee ?? '00'}
        </S.Row>
      </S.GreenWrapper>
      <S.SpaceBetween>
        <S.Row>
          <Room />
          {room.type} / {room.structure}
        </S.Row>
        <S.Row>
          <Stairs />
          {floorLevel === '지상' ? `${floor ?? '00'}층` : floorLevel}
        </S.Row>
      </S.SpaceBetween>
      <S.Row>
        <Calendar />
        {contractTerm ?? '00'}개월 계약 / 입주 가능일 : {occupancyMonth}월 {occupancyPeriod}
      </S.Row>
      <S.Row>
        <LocationLineIcon height={20} width={20} />
        {address}
      </S.Row>
      <S.Row>
        <Subway />
        {station ?? '역'}까지 도보 {walkingTime ?? '00'}분
      </S.Row>
      <S.Row>
        <Building />
        {realEstate ?? '00부동산'}
      </S.Row>
    </S.Container>
  );
};

export default RoomInfoSection;

const Row = styled.div`
  ${flexRow}
`;

const S = {
  Container: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexColumn}
    gap: 25px;
    margin-bottom: 10px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;

    font-size: ${({ theme }) => theme.text.size.medium};
    letter-spacing: 0.05rem;
  `,
  GreenWrapper: styled.div`
    width: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.large};
    box-sizing: border-box;
    border-radius: 16px;
  `,
  Row: styled.div`
    ${flexRow}
    gap: 10px;
  `,
  SpaceBetween: styled.div`
    ${flexSpaceBetween}
  `,
  Title: styled(Row)`
    width: 100%;
    ${title1}
    min-height: 40px;
    word-break: keep-all;
  `,
};
