import { options } from '@/components/common/OptionButton/OptionIcon';
import useOptionStore from '@/store/useOptionStore';

interface Props {
  optionId: number;
  // isSelected: boolean;
  // onClickSelect: (optionId: number) => void;
}

const OptionButton = ({ optionId }: Props) => {
  const option = Object.values(options).find(opt => opt.id === optionId);
  const { isSelectedOption, addOption, removeOption } = useOptionStore();
  if (!option) {
    return null;
  }

  const FilledIcon = option.filled;
  const UnfilledIcon = option.unfilled;

  return (
    <div>
      {isSelectedOption ? <FilledIcon onClick={() => addOption} /> : <UnfilledIcon onClick={() => removeOption} />}
    </div>
  );
};

export default OptionButton;
