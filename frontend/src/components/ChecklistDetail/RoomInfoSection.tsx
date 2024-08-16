import styled from '@emotion/styled';

import { Building, Calendar, LocationLineIcon, Room, Stairs, Subway } from '@/assets/assets';
import LikeButton from '@/components/_common/Like/LikeButton';
import { flexColumn, flexRow, flexSpaceBetween, title1 } from '@/styles/common';
import { RoomInfo } from '@/types/room';
import formattedUndefined from '@/utils/formattedUndefined';

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
    //address,
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
          {formattedUndefined(deposit)} / {formattedUndefined(rent)} + {formattedUndefined(fee)}
        </S.Row>
      </S.GreenWrapper>
      <S.SpaceBetween>
        <S.Row>
          <Room />
          {room.type} / {room.structure}
        </S.Row>
        <S.Row>
          <Stairs />
          {floorLevel === '지상' ? `${formattedUndefined(floor)}층` : floorLevel}
        </S.Row>
      </S.SpaceBetween>
      <S.Row>
        <Calendar />
        {formattedUndefined(contractTerm)}개월 계약 / 입주 가능일 : {occupancyMonth}월 {occupancyPeriod}
      </S.Row>
      <S.Row>
        <LocationLineIcon height={20} width={20} />
        {/*TODO: 백엔드가 보내주는 주소 형태 확정되면 수정 필요*/}
        {/* {address} */}
      </S.Row>
      <S.Row>
        <Subway />
        {formattedUndefined(station)}까지 도보 {formattedUndefined(walkingTime)}분
      </S.Row>
      <S.Row>
        <Building />
        {formattedUndefined(realEstate, 'string', '부동산')}
      </S.Row>
    </S.Container>
  );
};

export default RoomInfoSection;

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
  Title: styled.div`
    width: 100%;
    ${title1}
    min-height: 40px;
    word-break: keep-all;
  `,
};
