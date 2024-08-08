import useOptionStore from '@/store/useOptionStore';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option }: { option: OptionWithIcon }) => {
  const { Filled, Unfilled, id } = option;
  const { isSelectedOption, addOption, removeOption } = useOptionStore();

  if (!option) {
    return null;
  }

  return (
    <div>
      {isSelectedOption(id) ? (
        <Filled width={70} height={70} onClick={() => removeOption(id)} />
      ) : (
        <Unfilled width={70} height={70} onClick={() => addOption(id)} />
      )}
    </div>
  );
};

export default OptionButton;
