import { options } from '@/components/common/OptionButton/OptionIcon';
// const OPTION_COUNT = 14;

// const optionSelected = [];

interface Props {
  optionId: number;
  isSelected: boolean;
  onClickSelect: (optionId: number) => void;
}

const OptionButton = ({ optionId, isSelected, onClickSelect }: Props) => {
  const option = Object.values(options).find(opt => opt.id === optionId);

  if (!option) {
    return null;
  }

  const FilledIcon = option.filled;
  const UnfilledIcon = option.unfilled;

  return (
    <div>
      {isSelected ? (
        <FilledIcon
          onClick={() => {
            onClickSelect(optionId);
          }}
        />
      ) : (
        <UnfilledIcon
          onClick={() => {
            onClickSelect(optionId);
          }}
        />
      )}
    </div>
  );
};

export default OptionButton;
