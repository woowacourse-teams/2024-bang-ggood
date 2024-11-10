import styled from '@emotion/styled';

import FaceIcon from '@/components/_common/FaceIcon/FaceIcon';
import SubwayStations from '@/components/_common/Subway/SubwayStations';
import CompareCardItem from '@/components/ChecklistCompare/CompareCardItem';
import { boxShadow, flexColumn, title1, title2, title3 } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklistCompare';
// import calcEmotions from '@/utils/calcEmotions';

interface Props {
  room: ChecklistCompare;
  index: number;
}

const CompareCard = ({ room, index }: Props) => {
  return (
    <S.Container>
      <S.Title index={index}>{room.roomName}</S.Title>
      <CompareCardItem height={7} label={'주소'} item={<S.Item>{room.address}</S.Item>} />
      <CompareCardItem label={'층수'} item={<S.Item>{room.floor}층</S.Item>} />
      <CompareCardItem
        label={'보증금 / 월세'}
        item={
          <S.Item>
            {room.deposit}/{room.rent}
          </S.Item>
        }
      />
      <CompareCardItem label={'계약기간'} item={<S.Item>{room.contractTerm}개월</S.Item>} />
      <CompareCardItem
        label={'교통편'}
        item={
          <S.Item>
            {room.station}/
            <br />
            도보 {room.walkingTime}분
          </S.Item>
        }
      />
      <SubwayStations stations={room.nearSubwayStations} />
      {/* <CompareCardItem label={'옵션'} item={<S.OptionButton>{room.options.length}개</S.OptionButton>} /> */}
      {/* TODO: 모든 카테고리를 다 보여주고 없으면 - 표시로 변경 */}
      {room.categories.map(category => (
        <CompareCardItem
          key={category.categoryId}
          label={category.categoryName}
          item={
            <FaceIcon emotion="GOOD" />
            // <FaceIcon>
            //   {/* <FaceMark.FaceIcon emotion={calcEmotions(category.score)} isFilled={true} /> */}
            //   {/* <FaceMark.Footer>{category.score}점</FaceMark.Footer>
            // </FaceMark> */}
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
  Title: styled.div<{ index: number }>`
    ${title2}
    color:${({ index, theme }) => (index === 0 ? theme.palette.yellow600 : theme.palette.green600)}
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
    line-height: 1.5;
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
};
