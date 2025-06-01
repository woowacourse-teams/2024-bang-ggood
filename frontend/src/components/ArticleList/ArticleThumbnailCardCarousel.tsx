import ArticleThumbnailCard from '@/components/ArticleList/ArticleThumbnailCard';
import useGetArticleListQuery from '@/hooks/query/useGetArticleListQuery';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

export const ArticleThumbnailCardCarousel = () => {
  const { articles = [] } = useGetArticleListQuery();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setCurrentIndex(index);
  };

  return (
    <S.Wrapper>
      <S.ScrollBox ref={scrollRef} onScroll={handleScroll}>
        {[...articles].slice(0, 4).map(article => (
          <S.Slide key={article.articleId}>
            <ArticleThumbnailCard article={article} />
          </S.Slide>
        ))}
      </S.ScrollBox>

      <S.DotContainer>
        {[...articles].slice(0, 4).map((_, idx) => (
          <S.Dot key={idx} active={idx === currentIndex} />
        ))}
      </S.DotContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `,

  ScrollBox: styled.div`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Slide: styled.div`
    flex-shrink: 0;
    scroll-snap-align: start;
    width: 100%;
    max-width: 100%;
  `,
  DotContainer: styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    margin-top: 1rem;
    gap: 0.5rem;
  `,
  Dot: styled.div<{ active: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: ${({ active, theme }) => (active ? theme.color.gray[500] : theme.color.gray[100])};
    transition: background-color 0.3s;
  `,
};
