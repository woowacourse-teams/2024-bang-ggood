import { useCallback } from 'react';
import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
import RealTimeAddressModal from '@/components/NewChecklist/AddressModal/RealTimeAddressModal';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const Address = () => {
  const address = useStore(checklistRoomInfoStore, state => state.rawValue.address);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.address);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const handleSetAddress = useCallback(
    (address: string) => {
      actions.set('address', address);
    },
    [actions],
  );

  return (
    <FormField>
      <FormField.Label label="주소" />
      <FormField.Input onChange={actions.onChange} name="address" value={address} />
      <FlexBox.Horizontal>
        <RealTimeAddressModal />
        <DaumAddressModal setAddress={handleSetAddress} />
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default Address;
