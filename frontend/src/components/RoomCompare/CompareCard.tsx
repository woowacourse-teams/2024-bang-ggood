import styled from '@emotion/styled';

import FaceMark from '@/components/common/FaceMark/FaceMark';
import CompareItem from '@/components/RoomCompare/CompareItem';
import { boxShadow, flexColumn, title1, title2, title3 } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklist';
import calcEmotions from '@/utils/calcEmotions';

interface Props {
  count?: number;
  room: ChecklistCompare;
}

const CompareCard = ({ count, room }: Props) => {
  // TODO: 백엔드 rank 전달 못함으로 인해 주석
  // const isHightestRoom = room.rank === 1 ? true : false;

  const isHightestRoom = count === 1 ? true : false;

  return (
    <S.Container isHightLight={isHightestRoom}>
      <S.Title>{room.roomName}</S.Title>
      <S.RankWrapper>
        {/* <S.Rank>{room.rank}등</S.Rank> */}
        {count === 0 && <S.Rank>2등</S.Rank>}
        {count === 1 && <S.Rank>1등</S.Rank>}
        {count === 2 && <S.Rank>3등</S.Rank>}
        <S.Score>({room.score}점)</S.Score>
      </S.RankWrapper>
      <CompareItem
        label={'주소 / 층수'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {room.address} / {room.floor}층
          </S.Item>
        }
      />
      <CompareItem
        label={'보증금 / 월세'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {room.deposit}/{room.rent}
          </S.Item>
        }
      />
      <CompareItem label={'계약기간'} isLabeled={isHightestRoom} item={<S.Item>{room.contractTerm}개월</S.Item>} />
      <CompareItem
        label={'교통편'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {room.station}/
            <br />
            도보 {room.walkingTime}분
          </S.Item>
        }
      />
      <CompareItem
        label={'옵션'}
        isLabeled={isHightestRoom}
        item={<S.OptionButton>{room.optionCount}개</S.OptionButton>}
      />
      {/* TODO: 모든 카테고리를 다 보여주고 없으면 - 표시로 변경 */}
      <S.Subtitle isLabeled={isHightestRoom}>체크리스트</S.Subtitle>
      {room.categories.map(category => (
        <CompareItem
          key={category.categoryId}
          label={category.categoryName}
          isLabeled={isHightestRoom}
          item={
            <FaceMark>
              <FaceMark.FaceIcon emotion={calcEmotions(category.score)} isFilled={true} />
              <FaceMark.Footer>{Math.round(category.score / 10)}점</FaceMark.Footer>
            </FaceMark>
          }
        />
      ))}
    </S.Container>
  );
};

export default CompareCard;

const S = {
  Container: styled.div<{ isHightLight: boolean }>`
    width: 100%;
    padding: 20px 4px;
    box-sizing: border-box;
    ${flexColumn};
    align-items: center;
    gap: 20px;

    background-color: ${({ isHightLight }) => isHightLight && '#FBFBFB'};
  `,
  Title: styled.div`
    ${title2}
  `,
  RankWrapper: styled.div`
    ${flexColumn}
    gap: 5px;
  `,
  Rank: styled.div`
    ${title1}
  `,
  Score: styled.span`
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Item: styled.div`
    display: flex;
    width: 100%;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.2rem;
    letter-spacing: 0.05rem;
    text-align: center;
    justify-content: center;
    word-break: keep-all;
  `,
  OptionButton: styled.button`
    ${title3}
    padding: 12px 24px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};
    border-radius: 8px;
    ${boxShadow}
  `,
  Subtitle: styled.div<{ isLabeled: boolean }>`
    visibility: ${({ isLabeled }) => (isLabeled ? 'visible' : 'hidden')};
    margin-top: 20px;

    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};
