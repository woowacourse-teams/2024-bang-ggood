import React from 'react';

import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FormField from '@/components/_common/FormField/FormField';
import Input from '@/components/_common/Input/Input';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomFloorLevels } from '@/constants/roomInfo';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomFloor = () => {
  const floor = useRoomInfoValidated('floor');
  const floorLevel = useRoomInfoValidated('floorLevel');

  const handleClickDropdown = (level: string) => {
    floorLevel.set(level);
    if (level === '반지하/지하') {
      floor.set('');
    }
  };

  return (
    <FormField>
      <FormField.Label label="층수" htmlFor="floor" />
      <FormStyled.FieldBox>
        <Dropdown
          initialValue={floorLevel.rawValue}
          options={roomFloorLevels.map(value => ({ value }))}
          onSelectSetter={handleClickDropdown}
        />
        <Input
          inputMode="decimal"
          width="medium"
          disabled={floorLevel.rawValue === '반지하/지하'}
          placeholder=""
          name="floor"
          value={floor.rawValue}
          onChange={floor.onChange}
          id="floor"
        />
        <FormStyled.FlexLabel label="층"></FormStyled.FlexLabel>
      </FormStyled.FieldBox>
      <FormField.ErrorMessage value={floor.errorMessage} />
    </FormField>
  );
};

export default React.memo(RoomFloor);
