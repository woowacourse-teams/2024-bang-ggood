import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
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
import RoomSize from '@/components/NewChecklist/NewRoomInfoForm/RoomSize';
import RoomStructure from '@/components/NewChecklist/NewRoomInfoForm/RoomStructure';
import { flexColumn } from '@/styles/common';

const NewChecklistInfoTemplate = () => {
  return (
    <Layout withHeader withTab>
      <S.Container>
        <RoomName />
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
      </S.Container>
    </Layout>
  );
};

const S = {
  Container: styled.div`
    ${flexColumn}
    justify-content: start;
    row-gap: 2rem;

    margin-bottom: 2rem;
  `,
};

export default NewChecklistInfoTemplate;
