import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
import RealTimeAddressModal from '@/components/NewChecklist/AddressModal/RealTimeAddressModal';
import checklistAddressStore from '@/store/checklistAddressStore';

const Address = () => {
  const address = useStore(checklistAddressStore, state => state.address);

  return (
    <FormField>
      <FormField.Label label="주소" />
      <FormField.Input name="address" value={address} />
      <FlexBox.Horizontal>
        {/*실시간 위치 모달*/}
        <RealTimeAddressModal />
        {/*주소 찾기 모달*/}
        <DaumAddressModal />
      </FlexBox.Horizontal>
      <FormField.ErrorMessage value="" /> {/* 검증이 없으므로 에러메시지도 없음 */}
    </FormField>
  );
};

export default Address;