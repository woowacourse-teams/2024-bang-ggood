import styled from '@emotion/styled';

import SubwayStations from '@/components/_common/Subway/SubwayStations';
import CategoryScore from '@/components/RoomCompare/CategoryScore';
import CompareCardItem from '@/components/RoomCompare/CompareCardItem';
import { EMPTY_INDICATOR } from '@/constants/system';
import { boxShadow, flexColumn, title1, title4 } from '@/styles/common';
import { RoomCompare } from '@/types/RoomCompare';

interface Props {
  room: RoomCompare;
  index: number;
  openOptionModal: () => void;
  openCategoryModal: (roomId: number, categoryId: number) => void;
}

const CompareCard = ({ room, openOptionModal, openCategoryModal }: Props) => {
  return (
    <S.Container>
      <CompareCardItem height={7} label={'주소'} item={<S.Item>{room.address}</S.Item>} />
      <CompareCardItem label={'층수'} item={<S.Item>{room.floor ? `${room.floor}층` : EMPTY_INDICATOR}</S.Item>} />
      <CompareCardItem
        label={'보증금 / 월세'}
        item={
          <S.Item>
            {room.deposit ?? EMPTY_INDICATOR}/{room.rent ?? EMPTY_INDICATOR}
          </S.Item>
        }
      />
      <CompareCardItem
        label={'방 구조 / 방 평수'}
        item={
          <S.Item>{`${room.structure ?? EMPTY_INDICATOR}/${room.size ? `${room.size}평` : EMPTY_INDICATOR}`}</S.Item>
        }
      />
      <CompareCardItem label={'계약기간'} item={<S.Item>{room.contractTerm}개월</S.Item>} />
      <CompareCardItem
        height={10}
        label={'가까운 지하철'}
        item={<SubwayStations size={'small'} stations={room.stations.stations} textType="omit" />}
      />
      <CompareCardItem
        label={'옵션'}
        item={<S.OptionButton onClick={openOptionModal}>{room.options.length}개</S.OptionButton>}
      />
      {/*카테고리별 질문 평점 섹션*/}
      {room?.categories?.categories.map(category => (
        <CompareCardItem
          key={category.categoryId}
          label={category.categoryName}
          item={
            <CategoryScore
              roomId={room.checklistId}
              categoryId={category.categoryId}
              score={category.score}
              openCategoryModal={openCategoryModal}
            />
          }
        />
      ))}
    </S.Container>
  );
};

export default CompareCard;

const S = {
  Container: styled.div`
    width: 100%;
    padding: 20px 4px;
    box-sizing: border-box;
    ${flexColumn};
    align-items: center;
    gap: 30px;
  `,
  RankWrapper: styled.div`
    ${flexColumn}
    gap: 5px;
  `,
  Rank: styled.div`
    ${title1}
  `,
  Item: styled.div`
    display: flex;
    width: 100%;

    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    letter-spacing: 0.05rem;
    text-align: center;
    justify-content: center;
    word-break: keep-all;
  `,
  OptionButton: styled.button`
    ${title4}
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};
    border-radius: 8px;
    ${boxShadow}
  `,
};
