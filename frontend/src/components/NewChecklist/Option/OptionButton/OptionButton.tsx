import styled from '@emotion/styled';
import React from 'react';

import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import { flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option }: { option: OptionWithIcon }) => {
  const { FilledIcon, UnFilledIcon, displayName, id } = option;

  useSelectedOptionStore(); // 옵션 변경시 리렌더를 위해 불가피하게 전체구독
  const selectedOptionActions = useSelectedOptionStore(state => state.actions); //isSelectedOption, addOption,

  const handleClick = selectedOptionActions.isSelectedOption(id)
    ? () => selectedOptionActions.remove(id)
    : () => selectedOptionActions.add(id);

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

  const currentColor = selectedOptionActions.isSelectedOption(id) ? BUTTON_COLOR.selected : BUTTON_COLOR.unSelected;

  return (
    <S.Box color={currentColor.fill} borderColor={currentColor.border} onClick={handleClick}>
      <S.IconBox>{selectedOptionActions.isSelectedOption(id) ? <FilledIcon /> : <UnFilledIcon />}</S.IconBox>
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
    ${flexColumn}

    cursor: pointer;
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
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.small};

    @media (width <= 30rem) {
      font-size: ${({ theme }) => theme.text.size.xSmall};
    }

    @media (width <= 22rem) {
      font-size: ${({ theme }) => theme.text.size.xxSmall};
    }
  `,
};

const MemoziedOptionButton = React.memo(OptionButton);

export default MemoziedOptionButton;
