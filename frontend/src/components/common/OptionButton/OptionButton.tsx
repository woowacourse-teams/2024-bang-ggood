import { options } from '@/components/common/OptionButton/OptionIcon';

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
