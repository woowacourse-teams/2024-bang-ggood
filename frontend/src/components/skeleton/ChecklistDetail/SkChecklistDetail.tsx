import Layout from '@/components/_common/layout/Layout';
import SkChecklistAnswer from '@/components/skeleton/ChecklistDetail/SkChecklistAnswer';
import SkRoomInfoSection from '@/components/skeleton/ChecklistDetail/SkRoomInfoSection';
import theme from '@/styles/theme';

const SkChecklistDetail = () => {
  return (
    <>
      <Layout bgColor={theme.palette.grey100} withHeader>
        <SkRoomInfoSection />
        <SkChecklistAnswer />
      </Layout>
    </>
  );
};

export default SkChecklistDetail;
