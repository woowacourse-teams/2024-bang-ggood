import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';

import { ArrowDropdownIcon } from '@/assets/assets';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

interface Option {
  [key: string]: string;
}

interface Props extends CSSProperties {
  initialValue?: string;
  options: Option[];
  onSelectSetter: (value: string) => void;
  id?: string;
}

const Dropdown = ({ initialValue, options, onSelectSetter, id }: Props) => {
  const [selectedValue, setSelectedValue] = useState(initialValue ?? options[0].value ?? '');
  const [isVisibleOptions, setIsVisibleOptions] = useState(false);

  useEffect(() => {
    if (initialValue) setSelectedValue(initialValue);
  }, [initialValue]);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    setIsVisibleOptions(false);
    onSelectSetter(option.value);
  };

  return (
    <S.Wrapper id={id}>
      <S.DropDownHeader onClick={() => setIsVisibleOptions(prev => !prev)}>
        <S.SelectedOption>
          <div>{selectedValue}</div>
          <ArrowDropdownIcon />
        </S.SelectedOption>
      </S.DropDownHeader>
      {isVisibleOptions && (
        <S.OptionList>
          {options.map(option => (
            <S.OptionItem id={option.value} key={option.value} onClick={() => handleOptionClick(option)}>
              {option.value}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Wrapper>
  );
};

export default Dropdown;

const S = {
  Wrapper: styled.div`
    flex: 0 0 auto;
    position: relative;

    width: 16rem;
    height: 4.8rem;

    background-color: ${({ theme }) => theme.color.mono.white};
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
  DropDownHeader: styled.div`
    height: 100%;
    cursor: pointer;
  `,
  SelectedOption: styled.label`
    ${flexSpaceBetween}
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 2.4rem;
    padding: 1.6rem;
    align-items: center;
    box-sizing: border-box;
    border-radius: 0.4rem;
    column-gap: 0.4rem;
    border: ${({ theme }) => `1px solid ${theme.color.gray[400]}`};
    cursor: pointer;
  `,
  OptionList: styled.ul`
    position: absolute;
    ${flexColumn}
    z-index: ${({ theme }) => theme.zIndex.DROPDOWN};

    width: 16rem;
    max-height: 26rem;

    margin-top: 0.4rem;
    overflow-y: auto;
    box-shadow: ${({ theme }) => ` 0 0 1rem 0 ${theme.color.gray[400]}`};

    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.color.mono.white};
  `,
  OptionItem: styled.li`
    ${flexRow}
    align-items: center;
    z-index: ${({ theme }) => theme.zIndex.DROPDOWN};
    width: 90%;
    margin: 0.5rem 5%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.color.gray[200]};
    }
  `,
};
