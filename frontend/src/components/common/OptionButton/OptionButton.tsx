import styled from '@emotion/styled';

import { options } from '@/components/common/OptionButton/OptionIcon';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter } from '@/styles/common';

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
    <S.Box>
      {isSelectedOption(optionId) ? (
        <FilledIcon onClick={() => removeOption(optionId)} />
      ) : (
        <UnfilledIcon onClick={() => addOption(optionId)} />
      )}
    </S.Box>
  );
};

export default OptionButton;

const S = {
  Box: styled.div`
    width: 80px;
    max-width: 70px;

    ${flexCenter}
  `,
};
