import { options } from '@/components/_common/OptionButton/OptionIcon';
import useOptionStore from '@/store/useOptionStore';

interface Props {
  optionId: number;
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
      {isSelectedOption(optionId) ? (
        <FilledIcon onClick={() => removeOption(optionId)} />
      ) : (
        <UnfilledIcon onClick={() => addOption(optionId)} />
      )}
    </div>
  );
};

export default OptionButton;
