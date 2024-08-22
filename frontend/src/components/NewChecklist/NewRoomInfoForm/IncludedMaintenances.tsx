import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import FormStyled from '@/components/NewChecklist/NewRoomInfoForm/styled';
import { IncludedMaintenancesData } from '@/constants/roomInfo';
import checklistIncludedMaintenancesStore from '@/store/checklistIncludedMaintenancesStore';

const IncludedMaintenances = () => {
  const actions = useStore(checklistIncludedMaintenancesStore, state => state.actions);

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
            isSelected={actions.includes(id)}
            onClick={() => actions.toggle(id)}
          />
        ))}
      </FormStyled.OptionButtonContainer>
    </FlexBox.Vertical>
  );
};

export default IncludedMaintenances;
