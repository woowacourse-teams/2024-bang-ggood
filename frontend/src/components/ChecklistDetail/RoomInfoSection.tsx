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
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import { flexColumn, flexRow, flexSpaceBetween, title2, title3 } from '@/styles/common';
import { Option } from '@/types/option';
import { RoomInfo } from '@/types/room';
import { SubwayStation } from '@/types/subway';
import formattedDate from '@/utils/formattedDate';
import { formattedUndefined } from '@/utils/formattedUndefined';

interface Props {
  room: RoomInfo;
  options: Option[];
  checklistId: number;
  isLiked: boolean;
  nearSubways: SubwayStation[];
}

const RoomInfoSection = ({ nearSubways, room, options, checklistId, isLiked }: Props) => {
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

      <S.Row>
        <S.Label>
          <Summary aria-label="한줄평" />
          한줄평
        </S.Label>
        <S.Text>{formattedUndefined(summary, 'string')}</S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Pencil aria-label="작성 일자" />방 둘러본 날
        </S.Label>
        <S.Text>{formattedDate(createdAt ?? '', '.')}</S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Room aria-label="방 구조 / 방 평수" />
          방 구조 <br />방 평수
        </S.Label>
        <S.Text>
          {formattedUndefined(structure, 'string')} <br />
          {formattedUndefined(size)} 평
        </S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Stairs aria-label="방 층수" />방 층수
        </S.Label>
        <S.Text>
          {floorLevel === '지상' ? `${formattedUndefined(floor)}층` : formattedUndefined(floorLevel, 'string')}
        </S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Utils aria-label="관리비 포함 항목" />
          관리비 포함 항목
        </S.Label>
        <S.Text>
          {includedMaintenances
            ?.map(id => IncludedMaintenancesData.find(item => item.id === id)?.displayName)
            .filter(Boolean)
            .join(', ')}
          {!includedMaintenances?.length && formattedUndefined(includedMaintenances?.length, 'string')}
        </S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Calendar aria-label="계약 기간 / 입주 가능일" />
          계약 기간 <br />
          입주 가능일
        </S.Label>
        <S.Text>
          {formattedUndefined(contractTerm)}개월 계약 <br />
          {formattedUndefined(occupancyMonth)}월 {occupancyPeriod}
        </S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Options aria-label="옵션" />
          옵션
        </S.Label>
        <S.Text>
          {options.length
            ? options.map(option => option.optionName).join(', ')
            : formattedUndefined(options.length, 'string')}
        </S.Text>
      </S.Row>

      <S.Row>
        <S.Label>
          <Building aria-label="부동산" />
          부동산
        </S.Label>
        <S.Text>{formattedUndefined(realEstate, 'string')}</S.Text>
      </S.Row>

      <S.Column>
        <S.Label>
          <LocationLineIcon height={20} width={20} aria-label="주소" />
          주소
        </S.Label>
        <S.Text>
          {formattedUndefined(address, 'string')} <br />
          {buildingName}
        </S.Text>
      </S.Column>

      <S.Column>
        <S.Label>
          <Subway aria-label="가까운 지하철" />
          가까운 지하철
        </S.Label>
        <S.Text>
          <SubwayStations stations={nearSubways} />
        </S.Text>
      </S.Column>

      <AddressMap location={address ?? ''} />
    </S.Container>
  );
};

export default RoomInfoSection;

const S = {
  Container: styled.section`
    box-sizing: border-box;
    width: 100%;
    ${flexColumn}
    gap: 2rem;
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
    font-size: ${({ theme }) => theme.text.size.small};
    box-sizing: border-box;
    border-radius: 1.6rem;
  `,
  Label: styled.div`
    width: 100%;
    ${flexRow}
    gap: 1rem;

    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
  Text: styled.div`
    ${flexRow}
    width: 100%;
  `,
  Row: styled.div`
    width: 100%;
    ${flexRow}
    gap: 1rem;
  `,
  Column: styled.div`
    width: 100%;
    ${flexColumn}
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

    ${title3}
    ${flexRow}
    ${flexSpaceBetween}
  `,
};
