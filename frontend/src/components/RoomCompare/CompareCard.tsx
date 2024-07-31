import styled from '@emotion/styled';

import FaceMark from '@/components/common/FaceMark/FaceMark';
import CompareItem from '@/components/RoomCompare/CompareItem';
import { boxShadow, flexColumn, title1, title2, title3 } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklist';
import calcEmotions from '@/utils/calcEmotions';

interface Props {
  room: ChecklistCompare;
  compareNum: number;
}

const CompareCard = ({ room, compareNum }: Props) => {
  const {
    roomName,
    score,
    rank,
    address,
    floor,
    deposit,
    rent,
    contractTerm,
    station,
    walkingTime,
    options,
    categories,
  } = room;
  const isHightestRoom = rank === 1 || compareNum === 2 ? true : false;

  return (
    <S.Container isHightLight={isHightestRoom && compareNum === 3}>
      <S.Title>{roomName}</S.Title>
      <S.RankWrapper>
        <S.Rank>{rank}등</S.Rank>
        <S.Score>({score}점)</S.Score>
      </S.RankWrapper>
      <CompareItem
        label={'주소 / 층수'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {address} / {floor}층
          </S.Item>
        }
      />
      <CompareItem
        label={'보증금 / 월세'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {deposit}/{rent}
          </S.Item>
        }
      />
      {/* TODO: 백엔드 프로퍼티 작업 이후로 미룸 */}
      {/* <CompareItem
        label={'방 종류 / 구조'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {}/{rent}
          </S.Item>
        }
      /> */}
      <CompareItem label={'계약기간'} isLabeled={isHightestRoom} item={<S.Item>{contractTerm}개월</S.Item>} />
      <CompareItem
        label={'교통편'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {station}/
            <br />
            도보 {walkingTime}분
          </S.Item>
        }
      />
      <CompareItem
        label={'옵션'}
        isLabeled={isHightestRoom}
        item={<S.OptionButton>{options.length}개</S.OptionButton>}
      />
      <S.Subtitle isLabeled={isHightestRoom}>체크리스트</S.Subtitle>
      {categories.map(category => {
        const { categoryId, categoryName, score } = category;
        return (
          <CompareItem
            key={categoryId}
            label={categoryName}
            isLabeled={isHightestRoom}
            item={
              <FaceMark>
                <FaceMark.FaceIcon emotion={calcEmotions(score)} isFilled={!!score} />
                <FaceMark.Footer>{score ? `${Math.round(score / 10)}점` : `-`}</FaceMark.Footer>
              </FaceMark>
            }
          />
        );
      })}
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
