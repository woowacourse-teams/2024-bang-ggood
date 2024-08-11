import styled from '@emotion/styled';

import useOptionStore from '@/store/useOptionStore';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option }: { option: OptionWithIcon }) => {
  const { Filled, Unfilled, id } = option;
  const { isSelectedOption, addOption, removeOption } = useOptionStore();

  if (!option) {
    return null;
  }

  return (
    <S.Box>
      {isSelectedOption(id) ? (
        <S.Icon as={Filled} onClick={() => removeOption(id)} />
      ) : (
        <S.Icon as={Unfilled} onClick={() => addOption(id)} />
      )}
    </S.Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.svg`
  width: 65px;
  height: 65px;

  @media (width >= 400px) {
    width: 75px;
    height: 75px;
  }

  @media (width >= 600px) {
    width: 70px;
    height: 70px;
  }
`;

const S = {
  Box,
  Icon,
};

export default OptionButton;
