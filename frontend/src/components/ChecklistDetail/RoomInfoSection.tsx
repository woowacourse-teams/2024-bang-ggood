import styled from '@emotion/styled';

import {
  Building,
  Calendar,
  LocationLineIcon,
  Options,
  Pencil,
  Room,
  Stairs,
  Subway,
  Summary,
  Utils,
} from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import AddressMap from '@/components/_common/Map/AddressMap';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import { flexColumn, flexRow, flexSpaceBetween, title2 } from '@/styles/common';
import { Option } from '@/types/option';
import { RoomInfo } from '@/types/room';
import formattedDate from '@/utils/formattedDate';
import formattedUndefined from '@/utils/formattedUndefined';

interface Props {
  room: RoomInfo;
  options: Option[];
  checklistId: number;
  isLiked: boolean;
}

const RoomInfoSection = ({ room, options, checklistId, isLiked }: Props) => {
  const {
    roomName,
    deposit,
    rent,
    maintenanceFee,
    size,
    address,
    contractTerm,
    floor,
    floorLevel,
    station,
    walkingTime,
    realEstate,
    occupancyMonth,
    buildingName,
    occupancyPeriod,
    structure,
    includedMaintenances,
    summary,
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
          {formattedUndefined(structure, 'string', '방 구조')} / {formattedUndefined(size)} 평
        </S.Row>
        <S.Row>
          <Stairs />
          {floorLevel === '지상'
            ? `${formattedUndefined(floor)}층`
            : formattedUndefined(floorLevel, 'string', '방 종류')}
        </S.Row>
      </S.GapBox>
      <S.Row>
        <Utils />
        {includedMaintenances
          ?.map(id => IncludedMaintenancesData.find(item => item.id === id)?.displayName)
          .filter(Boolean)
          .join(', ')}{' '}
        관리비 포함
      </S.Row>
      <S.Row>
        <Calendar />
        {formattedUndefined(contractTerm)}개월 계약 <br />
        입주 가능일 : {formattedUndefined(occupancyMonth)}월 {occupancyPeriod}
      </S.Row>
      <S.Row>
        <Subway />
        {formattedUndefined(station)}역까지 도보 {formattedUndefined(walkingTime)}분
      </S.Row>
      <S.GapBox>
        <S.Row>
          <Building />
          {formattedUndefined(realEstate, 'string', '부동산')}
        </S.Row>
        <S.Row>
          <Pencil />
          {formattedDate(createdAt ?? '', '.')}
        </S.Row>
      </S.GapBox>
      <S.Row>
        <Options />
        {options.map(option => `${option.optionName},`)}
      </S.Row>
      <S.Row>
        <Summary />
        {summary}
      </S.Row>
      <S.Row>
        <LocationLineIcon height={20} width={20} />
        {formattedUndefined(address, 'string', '주소')} <br /> {buildingName}
      </S.Row>
      <AddressMap location={address ?? ''} />
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
