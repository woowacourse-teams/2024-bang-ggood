import styled from '@emotion/styled';
import { useState } from 'react';

import Badge from '@/components/_common/Badge/Badge';
import FaceMark from '@/components/_common/FaceMark/FaceMark';
import Modal from '@/components/_common/Modal/Modal';
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <S.Container isHightLight={isHightestRoom && compareNum === 3}>
      {/* 방 이름 / 점수 */}
      <S.Title>{roomName}</S.Title>
      <S.RankWrapper>
        <S.Rank>{rank}등</S.Rank>
        <S.Score>({score}점)</S.Score>
      </S.RankWrapper>
      {/* 주소 / 층수 */}
      <CompareItem
        label={'주소 / 층수'}
        isLabeled={isHightestRoom}
        item={
          <S.Item>
            {address} / {floor}층
          </S.Item>
        }
      />
      {/* 보증금 / 월세 */}
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
      {}
          </S.Item>
        }
      /> */}
      {/* 계약기간 */}
      <CompareItem label={'계약기간'} isLabeled={isHightestRoom} item={<S.Item>{contractTerm}개월</S.Item>} />
      {/* 교통편 */}
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
      {/* 옵션 버튼 및 모달 */}
      <CompareItem
        label={'옵션'}
        isLabeled={isHightestRoom}
        item={<S.OptionButton onClick={handleOpen}>{options.length}개</S.OptionButton>}
      />
      <Modal isOpen={isModalOpen} onClose={handleClose} hasCloseButton={true}>
        <Modal.header title="옵션 종류" />
        <Modal.body>
          <S.Box>
            {options.map(option => (
              <Badge size="long" key={option.optionId} label={option.optionName} />
            ))}
          </S.Box>
        </Modal.body>
      </Modal>
      {/* 체크리스트 카테고리별 모음 */}
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
    gap: 10px;

    background-color: ${({ isHightLight }) => isHightLight && '#FBFBFB'};
  `,
  Title: styled.div`
    ${title2}
    text-align: center;
    min-height: 40px;
    word-break: keep-all;
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
    min-height: 60px;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.2rem;
    letter-spacing: 0.05rem;
    text-align: center;
    justify-content: center;
    word-break: break-all;
  `,
  OptionButton: styled.button`
    ${title3}
    padding: 12px 24px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};
    border-radius: 8px;
    ${boxShadow}
  `,
  Box: styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  `,
  Subtitle: styled.div<{ isLabeled: boolean }>`
    visibility: ${({ isLabeled }) => (isLabeled ? 'visible' : 'hidden')};
    margin-top: 20px;

    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  MinBox: styled.div`
    min-height: 60px;
  `,
};
