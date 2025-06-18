import styled from '@emotion/styled';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Layout from '@/components/_common/layout/Layout';
import { Skeleton } from '@/styles/common';
import theme from '@/styles/theme';

const SkRoomCompare = () => {
  return (
    <div>
      <Layout withHeader bgColor={theme.color.mono.white}>
        <FlexBox.Vertical gap={'1rem'}>
          <FlexBox.Horizontal>
            <S.RowBox />
            <S.RowBox />
          </FlexBox.Horizontal>
          <S.Map />
          {Array.from({ length: 5 }, (_, index) => (
            <S.DetailBox key={index} />
          ))}
        </FlexBox.Vertical>
      </Layout>
    </div>
  );
};

export default SkRoomCompare;

const S = {
  RowBox: styled.div`
    width: 50%;
    height: 50px;
    ${Skeleton}
  `,
  Map: styled.div`
    width: 100%;
    height: 200px;
    ${Skeleton}
  `,
  DetailBox: styled.div`
    width: 100%;
    height: 60px;
    ${Skeleton}
  `,
};
