import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from '@/components/_common/layout/Layout';
import MoveNextButton from '@/components/NewChecklist/MoveNextButton';
import Address from '@/components/NewChecklist/NewRoomInfoForm/Address';
import DepositAndRent from '@/components/NewChecklist/NewRoomInfoForm/DepositAndRent';
import IncludedMaintenances from '@/components/NewChecklist/NewRoomInfoForm/IncludedMaintenances';
import MaintenanceFee from '@/components/NewChecklist/NewRoomInfoForm/MaintenanceFee';
import NearSubwayStations from '@/components/NewChecklist/NewRoomInfoForm/NearSubwayStations';
import OccupancyMonth from '@/components/NewChecklist/NewRoomInfoForm/OccupancyMonth';
import RealEstate from '@/components/NewChecklist/NewRoomInfoForm/RealEstate';
import RoomContractTerm from '@/components/NewChecklist/NewRoomInfoForm/RoomContractTerm';
import RoomFloor from '@/components/NewChecklist/NewRoomInfoForm/RoomFloor';
import RoomName from '@/components/NewChecklist/NewRoomInfoForm/RoomName';
import RoomNameNoDefault from '@/components/NewChecklist/NewRoomInfoForm/RoomNameNoDefault';
import RoomSize from '@/components/NewChecklist/NewRoomInfoForm/RoomSize';
import RoomStructure from '@/components/NewChecklist/NewRoomInfoForm/RoomStructure';
import { trackRoomInfoInput } from '@/service/amplitude/trackEvent';
import { flexColumn } from '@/styles/common';

const RoomInfoTemplate = () => {
  const handleTrackInput = (e: React.FocusEvent<HTMLInputElement>) => {
    trackRoomInfoInput(e.target.name);
  };

  return (
    <Layout withHeader withTab withFooter>
      <S.Container onBlur={handleTrackInput}>
        <ErrorBoundary FallbackComponent={RoomNameNoDefault}>
          <RoomName />
        </ErrorBoundary>
        <Address />
        <NearSubwayStations />
        <DepositAndRent />
        <MaintenanceFee />
        <IncludedMaintenances />
        <RoomFloor />
        <RoomStructure />
        <RoomSize />
        <RoomContractTerm />
        <OccupancyMonth />
        <RealEstate />
        <MoveNextButton marginBottom="1rem" />
      </S.Container>
    </Layout>
  );
};

const S = {
  Container: styled.div`
    ${flexColumn}
    justify-content: start;
    row-gap: 1.5rem;
    margin-bottom: 2rem;
  `,
};

export default RoomInfoTemplate;
