import { useStore } from 'zustand';

import FormField from '@/components/_common/FormField/FormField';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';

const RealEstate = () => {
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const realEstate = useStore(checklistRoomInfoStore, state => state.rawValue.realEstate);
  const errorMessage = useStore(checklistRoomInfoStore, state => state.errorMessage.realEstate);

  return (
    <FormField>
      <FormField.Label label={'부동산 이름'} required={false} htmlFor="realEstate" />
      <FormField.Input
        placeholder=""
        width="full"
        type={'string'}
        onChange={actions.onChange}
        name={'realEstate'}
        value={realEstate}
        id="realEstate"
      />
      <FormField.ErrorMessage value={errorMessage} />
    </FormField>
  );
};

export default RealEstate;
