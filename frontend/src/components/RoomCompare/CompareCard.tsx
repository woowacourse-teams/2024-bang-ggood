import styled from '@emotion/styled';
import React from 'react';

import SubwayStations from '@/components/_common/Subway/SubwayStations';
import CategoryScore from '@/components/RoomCompare/CategoryScore';
import CompareCardItem from '@/components/RoomCompare/CompareCardItem';
import { boxShadow, flexColumn, title1, title4 } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklistCompare';

interface Props {
  room: ChecklistCompare;
  index: number;
  openOptionModal: () => void;
  openCategoryModal: (roomId: number, categoryId: number) => void;
}

const EmptyIndicator = ' - ';

const CompareCard = ({ room, openOptionModal, openCategoryModal }: Props) => {
  return (
    <S.Container>
      <CompareCardItem height={7} label={'주소'} item={<S.Item>{room.address}</S.Item>} />
      <CompareCardItem label={'층수'} item={<S.Item>{room.floor ? `${room.floor}층` : EmptyIndicator}</S.Item>} />
      <CompareCardItem
        label={'보증금 / 월세'}
        item={
          <S.Item>
            {room.deposit ?? EmptyIndicator}/{room.rent ?? EmptyIndicator}
          </S.Item>
        }
      />
      <CompareCardItem
        label={'방 구조 / 방 평수'}
        item={<S.Item>{`${room.structure ?? EmptyIndicator}/${room.size ? `${room.size}평` : EmptyIndicator}`}</S.Item>}
      />
      <CompareCardItem label={'계약기간'} item={<S.Item>{room.contractTerm}개월</S.Item>} />
      <CompareCardItem
        label={'가까운 지하철'}
        item={<SubwayStations size={'small'} stations={room.nearSubwayStations} />}
      />
      <CompareCardItem
        label={'옵션'}
        item={<S.OptionButton onClick={openOptionModal}>{room.options.length}개</S.OptionButton>}
      />
      {/* TODO: 모든 카테고리를 다 보여주고 없으면 - 표시로 변경 */}
      {room.categories.map(category => (
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

const CompareCardMemo = React.memo(CompareCard);
export default CompareCardMemo;

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
