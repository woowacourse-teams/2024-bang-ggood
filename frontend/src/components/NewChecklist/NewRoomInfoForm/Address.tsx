import { useStore } from 'zustand';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
import RealTimeAddressModal from '@/components/NewChecklist/AddressModal/RealTimeAddressModal';
import roomInfoNonValidatedStore from '@/store/roomInfoNonValidatedStore';

const Address = () => {
  const address = useStore(roomInfoNonValidatedStore, state => state.address);
  const buildingName = useStore(roomInfoNonValidatedStore, state => state.buildingName);

  return (
    <FormField>
      <FormField.Label label="주소" />
      {address ? (
        <FormField.TextBox text={`${address} ${buildingName}`} />
      ) : (
        <FormField.TextBox text={'주소를 추가해 주세요.'} />
      )}
      <FlexBox.Horizontal style={{ marginTop: '2rem' }}>
        {/*실시간 위치 모달*/}
        <RealTimeAddressModal />
        {/*주소 찾기 모달*/}
        <DaumAddressModal />
      </FlexBox.Horizontal>
      <FormField.BottomEmptyBox />
    </FormField>
  );
};

export default Address;
