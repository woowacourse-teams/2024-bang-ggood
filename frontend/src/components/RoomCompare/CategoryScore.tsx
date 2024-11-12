import styled from '@emotion/styled';

import FaceIcon from '@/components/_common/FaceIcon/FaceIcon';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { boxShadow, flexCenter } from '@/styles/common';

const MIN_GOOD_SCORE = 70;
const MIN_SOSO_SCORE = 30;

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
  Score: styled.span`
    width: 4rem;
    padding: 6px 8px;
    border: 1px solid ${({ theme }) => theme.palette.grey300};

    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 8px;
    ${boxShadow}
  `,
};
