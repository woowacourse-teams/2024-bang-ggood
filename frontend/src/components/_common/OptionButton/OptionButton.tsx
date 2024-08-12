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
  width: 85px;
  height: 85px;

  @media (width <= 596px) {
    width: 80px;
    height: 80px;
  }

  @media (width <= 570px) {
    width: 70px;
    height: 70px;
  }

  @media (width <= 514px) {
    width: 85px;
    height: 85px;
  }

  @media (width <= 488px) {
    width: 75px;
    height: 75px;
  }

  @media (width <= 445px) {
    width: 70px;
    height: 70px;
  }

  @media (width <= 435px) {
    width: 90px;
    height: 90px;
  }

  @media (width <= 397px) {
    width: 85px;
    height: 85px;
  }

  @media (width <= 380px) {
    width: 80px;
    height: 80px;
  }

  @media (width <= 364px) {
    width: 75px;
    height: 75px;
  }

  @media (width <= 347px) {
    width: 70px;
    height: 70px;
  }

  @media (width <= 332px) {
    width: 60px;
    height: 60px;
  }
`;

const S = {
  Box,
  Icon,
};

export default OptionButton;
