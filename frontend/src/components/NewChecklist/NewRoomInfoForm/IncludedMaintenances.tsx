import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import roomInfoStore from '@/store/roomInfoStore';

const IncludedMaintenances = () => {
  // TODO: nonValidated 에서 관리해야함. 일단은 놔뒀음.

  const includedMaintenances = useStore(roomInfoStore, state => state.includedMaintenances).rawValue;
  const actions = useStore(roomInfoStore, state => state.actions);

  const isIncluded = useCallback((id: number) => includedMaintenances.includes(id), [includedMaintenances]);

  const handleToggleButton = useCallback(
    (clickedId: number) => {
      const updatedValue = isIncluded(clickedId)
        ? includedMaintenances.filter(id => id !== clickedId)
        : [...(includedMaintenances || []), clickedId];
      actions.set({ includedMaintenances: { rawValue: updatedValue, errorMessage: '' } });
    },
    [includedMaintenances, actions, isIncluded],
  );

  return (
    <FlexBox.Vertical>
      <FormField.Label label="관리비 포함 항목" htmlFor="includedMaintenances" bold />
      <FormStyled.OptionButtonContainer flexWrap="wrap">
        {IncludedMaintenancesData.map(({ id, displayName }) => (
          <Badge
            key={displayName}
            label={displayName}
            name={displayName}
            size="button"
            isSelected={isIncluded(id)}
            onClick={() => handleToggleButton(id)}
          />
        ))}
      </FormStyled.OptionButtonContainer>
      <FormField.BottomEmptyBox />
    </FlexBox.Vertical>
  );
};

export default IncludedMaintenances;
