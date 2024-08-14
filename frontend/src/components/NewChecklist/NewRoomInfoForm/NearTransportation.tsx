import FormField from '@/components/_common/FormField/FormField';
import { FlexVertical } from '@/styles/styled';

const NearTransportation = () => {
  return (
    <FlexVertical gap="15px">
      <FormField.Label label="가까운 교통편" />
      <FormField.ErrorMessage value="주소를 추가하면 가까운 역을 찾아드려요!" />
    </FlexVertical>
  );
};

export default NearTransportation;
