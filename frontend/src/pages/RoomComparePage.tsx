import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import RoomCompareContent from '@/components/RoomCompare/RoomCompareContent';
import { ROUTE_PATH } from '@/constants/routePath';
import theme from '@/styles/theme';

export interface OptionDetail {
  optionId: number;
  optionName: string;
  hasOption: [boolean, boolean];
}

const RoomComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId1 = Number(searchParams.get('roomId1'));
  const roomId2 = Number(searchParams.get('roomId2'));

  if (!roomId1 || !roomId2) throw new Error('잘못된 비교입니다.');

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={handleClickBackward} />}
        center={<Header.Text>방 비교하기</Header.Text>}
      />
      <Layout bgColor={theme.palette.white} withHeader>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense>
            <RoomCompareContent />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default RoomComparePage;
