import styled from '@emotion/styled';
import { useState } from 'react';

import { DropdownMark } from '@/assets/assets';
import { flexColumn, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

interface Option {
  [key: string]: string;
}

interface Props {
  initialValue?: string;
  options: Option[];
  onSelectSetter: (value: string) => void;
}

const Dropdown = ({ initialValue, options, onSelectSetter }: Props) => {
  const [selectedValue, setSelectedValue] = useState(initialValue ?? options[0].value ?? '');
  const [isVisibleOptions, setIsVisibleOptions] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    setIsVisibleOptions(false);
    onSelectSetter(option.value);
  };

  return (
    <S.Wrapper>
      <S.DropDownHeader onClick={() => setIsVisibleOptions(prev => !prev)}>
        <S.SelectedOption>
          <div>{selectedValue}</div>
          <DropdownMark />
        </S.SelectedOption>
      </S.DropDownHeader>
      {isVisibleOptions && (
        <S.OptionList>
          {options.map(option => (
            <S.OptionItem key={option.value} onClick={() => handleOptionClick(option)}>
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
  `,
  DropDownHeader: styled.div`
    cursor: pointer;
    width: 125px;
    height: 100%;
  `,
  SelectedOption: styled.label`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid ${theme.palette.grey400};
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 4px;
    column-gap: 4px;
  `,
  OptionList: styled.ul`
    position: absolute;
    ${flexColumn}
    z-index: ${({ theme }) => theme.zIndex.DROPDOWN};
    width: 125px;
    max-height: 260px;
    margin-top: 4px;
    overflow-y: auto;
    box-shadow: 0 0 10px 0 ${theme.palette.grey400};

    border-radius: 8px;

    background-color: ${theme.palette.white};
  `,
  OptionItem: styled.li`
    ${flexRow}
    align-items: center;
    z-index: ${({ theme }) => theme.zIndex.DROPDOWN};
    width: 90%;
    margin: 5px 5%;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${theme.palette.grey400};
    }
  `,
};
