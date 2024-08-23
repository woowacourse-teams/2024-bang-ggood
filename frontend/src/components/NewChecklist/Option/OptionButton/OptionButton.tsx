import styled from '@emotion/styled';

import useOptionStore from '@/store/useOptionStore';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option }: { option: OptionWithIcon }) => {
  const { FilledIcon, UnFilledIcon, displayName, id } = option;
  const { addOption, removeOption, isSelectedOption } = useOptionStore(); //isSelectedOption, addOption,

  if (!option) {
    return null;
  }

  const BUTTON_COLOR = {
    unSelected: {
      border: theme.palette.grey300,
      text: theme.palette.grey500,
      fill: theme.palette.white,
    },
    selected: { border: theme.palette.yellow600, fill: theme.palette.yellow100, text: theme.palette.yellow700 },
  };

  const currentColor = isSelectedOption(id) ? BUTTON_COLOR.selected : BUTTON_COLOR.unSelected;

  return (
    <S.Box
      color={currentColor.fill}
      borderColor={currentColor.border}
      onClick={isSelectedOption(id) ? () => removeOption(id) : () => addOption(id)}
    >
      <S.IconBox>{isSelectedOption(id) ? <FilledIcon /> : <UnFilledIcon />}</S.IconBox>
      <S.TextBox color={currentColor.text}>{displayName}</S.TextBox>
    </S.Box>
  );
};

const S = {
  Box: styled.div<{ color: string; borderColor: string }>`
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    border: 0.2rem solid ${({ borderColor }) => borderColor};

    background-color: ${({ color }) => color};

    font-size: 1.4rem;
    ${flexCenter}
    flex-direction: column;
  `,
  IconBox: styled.div`
    position: absolute;
    top: 10%;
    height: 50%;
    aspect-ratio: 1 / 1;

    ${flexCenter};
  `,
  TextBox: styled.span<{ color: string }>`
    position: absolute;
    bottom: 15%;

    width: 100%;
    ${flexCenter}

    color: ${({ color }) => color};
    font-weight: bold;
    font-size: 1.4rem;

    @media (width <= 34.4rem) {
      font-size: 1.2rem;
    }

    @media (width >= 58rem) {
      font-size: 1.2rem;
    }
  `,
};

export default OptionButton;
