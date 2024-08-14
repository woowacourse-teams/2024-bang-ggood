import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';

const NearTransportation = () => {
  return (
    <FlexBox.Vertical gap="15px">
      <FormField.Label label="가까운 교통편" />
      <FormField.ErrorMessage value="주소를 추가하면 가까운 역을 찾아드려요!" />
    </FlexBox.Vertical>
  );
};

export default NearTransportation;
