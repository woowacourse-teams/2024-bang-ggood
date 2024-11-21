import React, { useCallback } from 'react';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomStructures } from '@/constants/roomInfo';
import useRoomInfoValidated from '@/hooks/useRoomInfoValidated';

const RoomStructure = () => {
  const roomStructure = useRoomInfoValidated('structure');

  const handleClickTagButton = useCallback((value: string) => {
    roomStructure.set(value);
  }, []);

  return (
    <FlexBox.Vertical>
      <FormField.Label as="legend" label="방 구조" />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {roomStructures.map(structure => (
          <label key={structure}>
            <Badge
              label={structure}
              name={structure}
              size="button"
              isSelected={structure === roomStructure.rawValue}
              onClick={() => handleClickTagButton(structure)}
            />
          </label>
        ))}
      </FormStyled.OptionButtonContainer>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default React.memo(RoomStructure);
