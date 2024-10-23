import styled from '@emotion/styled';

import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import { title3 } from '@/styles/common';

const ArticleListTitle = () => {
  const { data: articles } = useGetArticleListQuery();

  return (
    <S.Title>
      방 구하기 전 꼭 필요한 이야기 <S.Count>{articles?.length}</S.Count>
    </S.Title>
  );
};

export default ArticleListTitle;

const S = {
  Title: styled.h1`
    ${title3}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
};
