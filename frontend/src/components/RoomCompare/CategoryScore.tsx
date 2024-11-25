import styled from '@emotion/styled';

import FaceIcon from '@/components/_common/FaceIcon/FaceIcon';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { MIN_GOOD_SCORE, MIN_SOSO_SCORE } from '@/constants/system';
import { boxShadow, flexCenter } from '@/styles/common';

interface Props {
  roomId: number;
  categoryId: number;
  score: number | null;
  openCategoryModal: (roomId: number, categoryId: number) => void;
}

const CategoryScore = ({ roomId, categoryId, score, openCategoryModal }: Props) => {
  const calcFaceIcon = (score: number | null) => {
    if (score === null) return 'NONE';
    if (score >= MIN_GOOD_SCORE) return 'GOOD';
    if (score >= MIN_SOSO_SCORE) return 'SOSO';
    return 'BAD';
  };

  return (
    <FlexBox.Vertical>
      <S.CategoryItemBox>
        <FaceIcon emotion={calcFaceIcon(score)} />
      </S.CategoryItemBox>
      <S.CategoryItemBox>
        <S.Score onClick={() => openCategoryModal(roomId, categoryId)}>{score === null ? '-' : `${score}%`}</S.Score>
      </S.CategoryItemBox>
    </FlexBox.Vertical>
  );
};

export default CategoryScore;

const S = {
  CategoryItemBox: styled.div`
    width: 7rem;

    ${flexCenter}
    text-align: center;
  `,
  Score: styled.button`
    width: 6.5rem;
    padding: 6px 8px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};

    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 8px;
    ${boxShadow}
  `,
};
