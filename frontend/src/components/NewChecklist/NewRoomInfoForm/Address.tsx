import React from 'react';
import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
import RealTimeAddressModal from '@/components/NewChecklist/AddressModal/RealTimeAddressModal';
import roomInfoStore from '@/store/roomInfoStore';

const Address = () => {
  const address = useStore(roomInfoStore, state => state.address);
  const buildingName = useStore(roomInfoStore, state => state.buildingName);

  return (
    <FormField>
      <FormField.Label label="주소" htmlFor="address" />
      {address?.rawValue ? (
        <FormField.TextBox text={`${address.rawValue} ${buildingName.rawValue}`} id="address" />
      ) : (
        <FormField.TextBox text={'주소를 추가해 주세요.'} id="address" />
      )}
      <FlexBox.Horizontal style={{ marginTop: '2rem', alignContent: 'center', justifyContent: 'center' }}>
        {/*실시간 위치 모달*/}
        <RealTimeAddressModal />
        {/*주소 찾기 모달*/}
        <DaumAddressModal />
      </FlexBox.Horizontal>
      <FormField.BottomEmptyBox />
    </FormField>
  );
};

export default React.memo(Address);
