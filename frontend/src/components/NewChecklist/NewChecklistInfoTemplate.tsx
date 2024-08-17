import styled from '@emotion/styled';

import Address from '@/components/NewChecklist/NewRoomInfoForm/Address';
import DepositAndRent from '@/components/NewChecklist/NewRoomInfoForm/DepositAndRent';
import IncludedUtilities from '@/components/NewChecklist/NewRoomInfoForm/IncludedUtilities';
import MaintenanceFee from '@/components/NewChecklist/NewRoomInfoForm/MaintenanceFee';
import NearTransportation from '@/components/NewChecklist/NewRoomInfoForm/NearTransportation';
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
    <>
      <S.EmptyBox />
      <S.ContentWrapper>
        <S.Container>
          <RoomName />
          <Address />
          <NearTransportation />
          <DepositAndRent />
          <MaintenanceFee />
          <IncludedUtilities />
          <RoomFloor />
          <RoomStructure />
          <RoomSize />
          <RoomContractTerm />
          <OccupancyMonth />
          <RealEstate />
        </S.Container>
      </S.ContentWrapper>
    </>
  );
};

const S = {
  EmptyBox: styled.div`
    height: 64px;
  `,
  ContentWrapper: styled.div`
    padding: 0 10px 30px;

    background-color: white;
  `,
  Container: styled.div`
    ${flexColumn}
    padding: 28px 22px;
    justify-content: start;
    row-gap: 28px;
  `,
};

export default NewChecklistInfoTemplate;