import styled from '@emotion/styled';
import React, { useState } from 'react';

import { trackOption } from '@/service/amplitude/trackEvent';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import { flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option, isSelected }: { option: OptionWithIcon; isSelected: boolean }) => {
  const { FilledIcon, UnFilledIcon, displayName, id } = option;

  const selectedOptionActions = useSelectedOptionStore(state => state.actions);
  const [statusMessage, setStatusMessage] = useState('');

  const handleClick = () => {
    trackOption(option.displayName);

    if (isSelected) {
      selectedOptionActions.remove(id);
      setStatusMessage(`${option.displayName} 선택 취소되었습니다.`);
    } else {
      selectedOptionActions.add(id);
      setStatusMessage(`${option.displayName} 선택되었습니다.`);
    }
  };

  if (!option) {
    return null;
  }

  const BUTTON_COLOR = {
    unSelected: {
      border: theme.palette.grey300,
      text: theme.palette.grey600,
      fill: theme.palette.grey300,
    },
    selected: {
      border: theme.palette.yellow500,
      fill: theme.palette.yellow500,
      text: theme.palette.grey600,
    },
  };

  const currentColor = isSelected ? BUTTON_COLOR.selected : BUTTON_COLOR.unSelected;

  return (
    <>
      <S.Box
        id={option.name}
        color={currentColor.fill}
        borderColor={currentColor.border}
        onClick={handleClick}
        aria-label={
          !isSelected
            ? `${displayName}을 옵션에 추가하려면 두번 탭하세요.`
            : `${displayName}을 옵션에서 해제하려면 두번 탭하세요.`
        }
      >
        <S.IconBox>{isSelected ? <FilledIcon aria-hidden="true" /> : <UnFilledIcon aria-hidden="true" />}</S.IconBox>
        <S.TextBox aria-hidden color={currentColor.text}>
          {displayName}
        </S.TextBox>
      </S.Box>
      <div className="visually-hidden" aria-live="assertive">
        {statusMessage}
      </div>
    </>
  );
};

export default React.memo(OptionButton);

const S = {
  Box: styled.button<{ color: string; borderColor: string }>`
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
    ${flexCenter};

    color: ${({ color }) => color};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.xSmall};

    @media (width <= 35rem) {
      font-size: ${({ theme }) => theme.text.size.xxSmall};
    }

    @media (width <= 32rem) {
      font-size: ${({ theme }) => theme.text.size.xSmall};
    }

    @media (width <= 28rem) {
      font-size: ${({ theme }) => theme.text.size.xxSmall};
    }

    @media (width <= 26rem) {
      font-size: ${({ theme }) => theme.text.size.xSmall};
    }

    @media (width <= 22rem) {
      font-size: ${({ theme }) => theme.text.size.xxSmall};
    }
  `,
};
