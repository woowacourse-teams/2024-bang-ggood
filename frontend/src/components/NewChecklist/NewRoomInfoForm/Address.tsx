import { useCallback } from 'react';
import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
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
      <FlexBox.Horizontal gap="3%">
        <FormField.Input onChange={actions.onChange} name="address" value={address} />
        <DaumAddressModal setAddress={handleSetAddress} />
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value={errorMessage ?? ''} />
    </FormField>
  );
};

export default Address;
