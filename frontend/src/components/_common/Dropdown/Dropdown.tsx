import styled from '@emotion/styled';
import { CSSProperties, useState } from 'react';

import { DropdownMark } from '@/assets/assets';
import { flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import theme from '@/styles/theme';

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
          <DropdownMark />
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
  `,
  DropDownHeader: styled.div`
    width: 12.5rem;
    height: 100%;
    cursor: pointer;
  `,
  SelectedOption: styled.label`
    ${flexSpaceBetween}
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 2.4rem;
    padding: 0 1rem;
    border: 0.1rem solid ${theme.palette.grey400};
    align-items: center;
    box-sizing: border-box;
    border-radius: 0.4rem;
    column-gap: 0.4rem;
    cursor: pointer;
  `,
  OptionList: styled.ul`
    position: absolute;
    ${flexColumn}
    z-index: ${({ theme }) => theme.zIndex.DROPDOWN};
    width: 12.5rem;
    max-height: 26rem;

    margin-top: 0.4rem;
    overflow-y: auto;
    box-shadow: 0 0 1rem 0 ${theme.palette.grey400};

    border-radius: 0.8rem;

    background-color: ${theme.palette.white};
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
      background-color: ${theme.palette.grey200};
    }
  `,
};
