import { options } from '@/assets/options/option';

// const OPTION_COUNT = 14;

// const optionSelected = [];

interface Props {
  optionId: number;
  isSelected: boolean;
  onClickSelect: () => void;
}

const OptionButton = ({ optionId, isSelected, onClickSelect }: Props) => {
  const option = Object.values(options).find(opt => opt.id === optionId);

  if (!option) {
    return null;
  }

  const FilledIcon = option.filled;
  const UnfilledIcon = option.unfilled;

  return <div onClick={onClickSelect}>{isSelected ? <FilledIcon /> : <UnfilledIcon />}</div>;
};

export default OptionButton;
