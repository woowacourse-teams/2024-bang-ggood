import styled from '@emotion/styled';

import { flexColumn, flexRow, title1, title2 } from '@/styles/common';
import { RoomInfo } from '@/types/room';

interface Props {
  room: RoomInfo;
  score: number;
  createdAt: string;
}

const RoomInfoSection = ({ room, score, createdAt }: Props) => {
  // TODO: 로딩 중일 때 스켈레톤표시
  if (!room) return null;
  const { roomName, deposit, rent, address, contractTerm, floor, floorLevel, station, walkingTime, realEstate } = room;

  return (
    <S.Container>
      <S.Row>
        <S.Title>{roomName}</S.Title>
        <S.Score>{score}점</S.Score>
      </S.Row>
      <S.Row>{address}</S.Row>
      <S.Row>
        <S.Rent>
          <S.Label>월세 :</S.Label>
          {deposit}/{rent}
        </S.Rent>
      </S.Row>
      <S.Row>
        <S.Box>
          <S.Label>계약 기간 : </S.Label>
          {contractTerm}개월
        </S.Box>
        {/* TODO: 방 종류, 방 구조 추가 */}
        <S.Box>
          <S.Label>층 :</S.Label>
          {floorLevel === '지상' ? `${floor}층` : floorLevel}
        </S.Box>
      </S.Row>
      <S.Row>
        <S.Label>교통편 :</S.Label>
        {station}까지 도보
        {walkingTime}분
      </S.Row>
      <S.Row>
        <S.Label>부동산 :</S.Label>
        {realEstate}
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
    font-size: ${({ theme }) => theme.text.size.large};
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
    ${title2}
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
