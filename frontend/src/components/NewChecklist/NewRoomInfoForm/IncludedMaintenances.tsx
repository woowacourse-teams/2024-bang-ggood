import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import { IncludedMaintenances } from '@/components/NewChecklist/NewRoomInfoForm/IncludedMaintenances';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import newRoomInfoStore from '@/store/newRoomInfoStore';

const IncludedMaintenances = () => {
  // TODO : nonValidated 에서 관리해야함. 일단은 놔뒀음.
  const IncludedMaintenances = useStore(newRoomInfoStore, state => state.includedMaintenances.rawValue);
  const actions = useStore(checklistRoomInfoStore, state => state.actions);
  const includedMaintenances = useStore(checklistRoomInfoStore, state => state.value.includedMaintenances);

  const handleCheckIncluded = (id: number) => !!includedMaintenances?.includes(id);

  const handleToggleButton = useCallback(
    (value: number) => {
      const isIncluded = handleCheckIncluded(value);

      const updatedValue = isIncluded
        ? includedMaintenances?.filter(id => id !== value)
        : [...(includedMaintenances || []), value];

      actions.set('includedMaintenances', updatedValue);
    },
    [includedMaintenances, actions],
  );

  return (
    <FlexBox.Vertical>
      <FormField.Label label="관리비 포함 항목" />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {IncludedMaintenancesData.map(({ id, displayName }) => (
          <Badge
            key={displayName}
            label={displayName}
            name={displayName}
            size="button"
            isSelected={handleCheckIncluded(id)}
            onClick={() => handleToggleButton(id)}
          />
        ))}
      </FormStyled.OptionButtonContainer>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default IncludedMaintenances;
