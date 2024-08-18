import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import SkChecklistAnswer from '@/components/skeleton/ChecklistDetail/SkChecklistAnswer';
import SkRoomInfoSection from '@/components/skeleton/ChecklistDetail/SkRoomInfoSection';
import theme from '@/styles/theme';

const SkChecklistDetail = () => {
  return (
    <>
      <Header />
      <Layout bgColor={theme.palette.grey100}>
        <Sk.Wrapper>
          <SkRoomInfoSection />
          <SkChecklistAnswer />
        </Sk.Wrapper>
      </Layout>
    </>
  );
};

export default SkChecklistDetail;

const Sk = {
  Wrapper: styled.div`
    min-height: calc(100vh - 64px);
  `,
};
