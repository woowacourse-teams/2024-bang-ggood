import styled from '@emotion/styled';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import LikeButton from '@/components/_common/Like/LikeButton';
import AddressMap from '@/components/_common/Map/AddressMap';
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import Text from '@/components/_common/Text/Text';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import { flexColumn } from '@/styles/common';
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
      <S.YellowWrapper>
        <FlexBox.Horizontal justify="space-between">
          <Text typography={font => font.heading[2].B}>{roomName}</Text>
          <LikeButton isLiked={isLiked} checklistId={checklistId} />
        </FlexBox.Horizontal>

        <Text typography={font => font.body[1].B} style={{ marginTop: '.8rem' }}>
          보증금 {formattedUndefined(deposit)} / 월세 {formattedUndefined(rent)} + 관리비{' '}
          {formattedUndefined(maintenanceFee)}
        </Text>
      </S.YellowWrapper>

      <>
        {[
          { name: '한줄평', content: summary ?? '이곳에 한줄평을 남겨보세요' },
          { name: '방 둘러본 날', content: formattedDate(createdAt ?? '', '.') },
          {
            name: '방 구조',
            content: (
              <>
                {formattedUndefined(structure, 'string')} <br />
                {formattedUndefined(size)} 평
              </>
            ),
          },
          {
            name: '방 층수',
            content:
              floorLevel === '지상' ? `${formattedUndefined(floor)}층` : formattedUndefined(floorLevel, 'string'),
          },
          {
            name: '관리비 포함 항목',
            content: (
              <>
                {includedMaintenances
                  ?.map(id => IncludedMaintenancesData.find(item => item.id === id)?.displayName)
                  .filter(Boolean)
                  .join(', ')}
                {!includedMaintenances?.length && formattedUndefined(includedMaintenances?.length, 'string')}
              </>
            ),
          },
          {
            name: '계약 기간/입주 가능일',
            content: (
              <>
                {formattedUndefined(contractTerm)}개월 계약 / {formattedUndefined(occupancyMonth)}월 {occupancyPeriod}
              </>
            ),
          },
          {
            name: '옵션',
            content: (
              <>
                {options.length
                  ? options.map(option => option.optionName).join(', ')
                  : formattedUndefined(options.length, 'string')}
              </>
            ),
          },
          { name: '부동산', content: <>{formattedUndefined(realEstate, 'string')}</> },
          {
            name: '주소',
            content: (
              <>
                {formattedUndefined(address, 'string')} <br />
                {buildingName}
              </>
            ),
          },
          { name: '가까운 지하철', content: <SubwayStations stations={nearSubways} /> },
        ].map(({ name, content }) => (
          <FlexBox.Vertical key={name} gap=".8rem">
            <Text typography={font => font.headline[2].B}>{name}</Text>
            <Text typography={font => font.headline[2].R}>{content}</Text>
          </FlexBox.Vertical>
        ))}
      </>

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

    background-color: ${({ theme }) => theme.color.mono.white};
    border-radius: 0.8rem;
  `,
  YellowWrapper: styled.div`
    padding: 1.6rem;
    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.color.primary[500]};

    color: ${({ theme }) => theme.color.mono.white};
  `,
};
