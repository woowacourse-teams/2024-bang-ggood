import styled from '@emotion/styled';

import { useGetArticleListSuspenseQuery } from '@/hooks/query/useGetArticleListSuspenseQuery';
import { fontStyle } from '@/utils/fontStyle';

const ArticleListTitle = () => {
  const { articles } = useGetArticleListSuspenseQuery();

  return (
    <S.Title>
      방 구하기 전 꼭 필요한 이야기 <S.Count>{articles?.length}</S.Count>
    </S.Title>
  );
};

export default ArticleListTitle;

const S = {
  Title: styled.h1`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.color.secondary[500]};
  `,
};
