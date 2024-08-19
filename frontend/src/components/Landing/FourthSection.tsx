import styled from '@emotion/styled';
import { useRef } from 'react';

import ArticleCard from '@/components/Article/ArticleCard';
import { Bold, Container, Highlight, ImageBox, Text, TextBox } from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { articleList } from '@/mocks/fixtures/articleList';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const { isIntersecting: isIntersecting2 } = useIntersection(INTERSECTION_CONFIG, ref2);

  return (
    <Container>
      <TextBox>
        <Text>
          필요한 질문은 <Bold>넣고,</Bold> <br />
          필요없는 질문은 <Bold>빼고!</Bold>
        </Text>
        <Text>
          원하는 질문들만 선택해서 나에게 <br />
          <Highlight>딱 맞는 체크리스트</Highlight>를 만들어 봐요.
        </Text>
        <S.Observer ref={ref} />
        <ImageBox isIntersecting={isIntersecting}>
          <img src="/image/mainScreenShot.png" width="200px" />
        </ImageBox>
        <Text margin={40}>
          방 구하기 초보라 아무것도 모르겠다면,
          <br />
          <Highlight> 집 구하기 꿀팁이 담긴 아티클(article)</Highlight>을
          <br /> 읽으면서 방 구하기 고수가 되어보아요!
          <S.Observer ref={ref2} />
          <ImageBox isIntersecting={isIntersecting2}>
            <ArticleCard index={1} article={articleList.articles[2]} />
          </ImageBox>
        </Text>
      </TextBox>
    </Container>
  );
};

export default FourthSection;

const S = {
  Observer: styled.div`
    height: 20px;
  `,
  PencilIconBox: styled.div`
    position: absolute;
    left: 30px;
  `,
  LampIconBox: styled.div`
    margin-top: 20px;
    position: absolute;
  `,
};
