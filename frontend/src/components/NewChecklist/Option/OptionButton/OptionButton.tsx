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
      border: theme.palette.grey400,
      text: theme.palette.grey500,
      fill: theme.palette.white,
    },
    selected: { border: '#EFBA1A', fill: '#FEF7D4', text: '#D09808' },
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
    border: 2px solid ${({ borderColor }) => borderColor};

    background-color: ${({ color }) => color};

    font-size: 14px;
    ${flexCenter}
    flex-direction: column;

    @media (width <= ${({ theme }) => theme.viewport.TABLET}) {
      width: 100%;
      padding-top: 100%;
    }

    @media (width <= ${({ theme }) => theme.viewport.MOBILE}) {
      width: 100%;
      padding-top: 100%;
    }
  `,
  IconBox: styled.div`
    position: absolute;
    top: 10%;
    width: 50%;
    height: 50%;
    aspect-ratio: 1 / 1;

    ${flexCenter}
  `,
  TextBox: styled.span<{ color: string }>`
    position: absolute;
    bottom: 15%;

    color: ${({ color }) => color};
    font-weight: bold;
  `,
};

export default OptionButton;
