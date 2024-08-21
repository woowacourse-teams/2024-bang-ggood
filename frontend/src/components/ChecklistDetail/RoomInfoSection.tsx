import styled from '@emotion/styled';

import { Building, Calendar, LocationLineIcon, Pencil, Room, Stairs, Subway } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import AddressMap from '@/components/_common/Map/AddressMap';
import { flexColumn, flexRow, flexSpaceBetween, title2 } from '@/styles/common';
import { RoomInfo } from '@/types/room';
import formattedDate from '@/utils/formattedDate';
import formattedUndefined from '@/utils/formattedUndefined';

interface Props {
  room: RoomInfo;
  checklistId: number;
  isLiked: boolean;
}

const RoomInfoSection = ({ room, checklistId, isLiked }: Props) => {
  // TODO: 로딩 중일 때 스켈레톤표시

  const {
    roomName,
    deposit,
    rent,
    maintenanceFee,
    address,
    contractTerm,
    floor,
    floorLevel,
    station,
    walkingTime,
    realEstate,
    occupancyMonth,
    occupancyPeriod,
    createdAt,
  } = room;

  return (
    <S.Container>
      <S.GreenWrapper>
        <S.Row>
          <S.Title>{roomName}</S.Title>
          <LikeButton isLiked={isLiked} checklistId={checklistId} />
        </S.Row>
        <S.Row>
          <S.MoneyText>
            <div>
              보증금 {formattedUndefined(deposit)} / 월세 {formattedUndefined(rent)} + 관리비{' '}
              {formattedUndefined(maintenanceFee)}
            </div>
          </S.MoneyText>
        </S.Row>
      </S.GreenWrapper>
      <S.GapBox>
        <S.Row>
          <Room />
          {formattedUndefined(room.structure, 'string', '방 구조')}
        </S.Row>
        <S.Row>
          <Stairs />
          {floorLevel === '지상'
            ? `${formattedUndefined(floor)}층`
            : formattedUndefined(floorLevel, 'string', '방 종류')}
        </S.Row>
      </S.GapBox>
      <S.Row>
        <Calendar />
        {formattedUndefined(contractTerm)}개월 계약 <br />
        입주 가능일 : {occupancyMonth}월 {occupancyPeriod}
      </S.Row>
      <S.Row>
        <LocationLineIcon height={20} width={20} />
        {formattedUndefined(address?.address, 'string', '주소')} <br /> {address?.buildingName}
      </S.Row>
      <S.Row>
        <Subway />
        {formattedUndefined(station)}까지 도보 {formattedUndefined(walkingTime)}분
      </S.Row>
      <S.Row>
        <Building />
        {formattedUndefined(realEstate, 'string', '부동산')}
      </S.Row>
      <S.Row>
        <Pencil />
        {formattedDate(createdAt ?? '')}
      </S.Row>
      <div></div>
      <AddressMap location={address?.address || ''} />
    </S.Container>
  );
};

export default RoomInfoSection;

const S = {
  Container: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexColumn}
    gap: 1.6rem;
    margin-bottom: 1rem;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;
  `,
  GreenWrapper: styled.div`
    width: 100%;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.medium};
    box-sizing: border-box;
    border-radius: 1.6rem;
  `,
  Row: styled.div`
    ${flexRow}
    gap: 1rem;
  `,
  GapBox: styled.div`
    display: flex;
    gap: 30%;

    @media (width <= 44rem) {
      gap: 6rem;
    }
  `,
  Title: styled.div`
    width: 100%;
    ${title2}
    min-height: 4rem;
    word-break: keep-all;
  `,
  MoneyText: styled.div`
    width: 100%;

    font-size: ${({ theme }) => theme.text.size.small};
    ${flexRow}
    ${flexSpaceBetween}
  `,
};
