import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { roomIncludedUtilites } from '@/constants/roomInfo';
import checklistIncludedUtilitiesStore from '@/store/checklistIncludedUtilitesStore';
import { IncludedUtilities } from '@/types/room';

type UtilityName = (typeof roomIncludedUtilites)[number];
type UtilityValue = keyof IncludedUtilities;
const nameToValue: Record<UtilityName, UtilityValue> = {
  '💧수도': 'water',
  '🛜인터넷': 'internet',
  '⚡전기': 'electricity',
  '⛽가스': 'gas',
};

const IncludedUtilities = () => {
  const includedUtilities = useStore(checklistIncludedUtilitiesStore);
  const actions = useStore(checklistIncludedUtilitiesStore, state => state.actions);

  const handleClickTagButton = useCallback(
    (name: keyof IncludedUtilities) => {
      actions.toggle(name);
    },
    [actions],
  );

  return (
    <FlexBox.Vertical>
      <FormField.Label label="관리비 포함 항목" />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {roomIncludedUtilites.map((utility: UtilityName) => (
          <Badge
            key={utility}
            label={utility}
            name={utility}
            size="button"
            isSelected={includedUtilities[nameToValue[utility]]}
            onClick={() => handleClickTagButton(nameToValue[utility])}
          />
        ))}
      </FormStyled.OptionButtonContainer>
    </FlexBox.Vertical>
  );
};

export default IncludedUtilities;
