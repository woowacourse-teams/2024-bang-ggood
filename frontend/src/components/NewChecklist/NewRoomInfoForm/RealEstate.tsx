import React from 'react';

import FormField from '@/components/_common/FormField/FormField';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RealEstate = () => {
  const realEstate = useRoomInfoValidated('realEstate');

  return (
    <FormField>
      <FormField.Label label={'부동산 이름'} required={false} htmlFor="realEstate" />
      <FormField.Input
        placeholder=""
        width="full"
        type={'string'}
        onChange={realEstate.onChange}
        name={'realEstate'}
        value={realEstate.rawValue}
        id="realEstate"
      />
      <FormField.ErrorMessage value={realEstate.errorMessage} />
    </FormField>
  );
};

export default React.memo(RealEstate);
