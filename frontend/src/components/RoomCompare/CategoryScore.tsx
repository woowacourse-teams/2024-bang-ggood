import styled from '@emotion/styled';

import FaceIcon from '@/components/_common/FaceIcon/FaceIcon';
import { MIN_GOOD_SCORE, MIN_SOSO_SCORE } from '@/constants/system';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

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
    <S.VerticalBox>
      <S.CategoryItemBox>
        <FaceIcon emotion={calcFaceIcon(score)} />
      </S.CategoryItemBox>
      <S.CategoryItemBox2>
        <S.Score onClick={() => openCategoryModal(roomId, categoryId)}>{score === null ? '-' : `${score}%`}</S.Score>
      </S.CategoryItemBox2>
    </S.VerticalBox>
  );
};

export default CategoryScore;

const S = {
  VerticalBox: styled.div`
    ${flexColumn}
    gap: 0.8rem;
    height: 100%;
  `,

  CategoryItemBox: styled.div`
    display: flex;
    width: 14rem;
    align-items: flex-start;
  `,

  CategoryItemBox2: styled.div`
    display: flex;
    height: 4rem;
    align-items: flex-start;
  `,

  Score: styled.button`
    width: 100%;
    height: 100%;
    padding: 6px 8px;
    border: 1px solid ${({ theme }) => theme.color.primary[500]};

    ${fontStyle(theme.font.body[1].B)};
    color: ${({ theme }) => theme.color.primary[500]};
    border-radius: 8px;
  `,
};
