import styled from '@emotion/styled';

import { flexColumn, flexRow, title1 } from '@/styles/common';
import { RoomInfo } from '@/types/room';

interface Props {
  room: RoomInfo;
  createdAt: string;
}

const RoomInfoSection = ({ room }: Props) => {
  // TODO: 로딩 중일 때 스켈레톤표시
  if (!room) return null;
  const { roomName, deposit, rent, address, contractTerm, floor, floorLevel, station, walkingTime, realEstate } = room;

  return (
    <S.Container>
      <S.Row>
        <S.Title>{roomName}</S.Title>
      </S.Row>
      <S.Row>{address}</S.Row>
      <S.Row>
        <S.Rent>
          <S.Label>월세 :</S.Label>
          {deposit ?? '00'}/{rent ?? '00'}
        </S.Rent>
      </S.Row>
      <S.Row>
        <S.Box>
          <S.Label>계약 기간 :</S.Label>
          {contractTerm ?? '00'}개월
        </S.Box>
        {/* TODO: 방 종류, 방 구조 추가 */}
        <S.Box>
          <S.Label>층 :</S.Label>
          {floorLevel === '지상' ? `${floor ?? '00'}층` : floorLevel}
        </S.Box>
      </S.Row>
      <S.Row>
        <S.Label>교통편 :</S.Label>
        {station ?? '역'}까지 도보
        {walkingTime ?? '00'}분
      </S.Row>
      <S.Row>
        <S.Label>부동산 :</S.Label>
        {realEstate ?? '00부동산'}
      </S.Row>
    </S.Container>
  );
};

export default RoomInfoSection;

const S = {
  Container: styled.div`
    ${flexColumn}
    gap: 20px;
    margin-bottom: 10px;
    padding: 24px 16px;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;
  `,
  Row: styled.div`
    ${flexRow}
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Title: styled.div`
    width: 100%;
    ${title1}
    min-height: 40px;
    word-break: keep-all;
  `,
  Score: styled.div`
    width: 100%;

    color: ${({ theme }) => theme.palette.green500};
    text-align: end;
    ${title1}
  `,
  Rent: styled.div`
    ${flexRow}
    letter-spacing: 0.05rem;
  `,
  Floor: styled.div`
    display: flex;
  `,
  Box: styled.div`
    ${flexRow}
    width: 100%;
  `,
  Label: styled.p`
    margin-right: 10px;

    color: ${({ theme }) => theme.palette.grey500};
  `,
};
