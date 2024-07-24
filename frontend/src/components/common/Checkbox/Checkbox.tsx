import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { CheckIcon } from '@/assets/assets';
import { flexCenter } from '@/styles/common';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean;
  color?: string;
}

const Checkbox = ({ isChecked = false, color = '#49CE7F' }: StyledProps) => {
  const [isCheckedState, setIsCheckedState] = useState<boolean>(isChecked);

  const handleClick = useCallback(() => {
    setIsCheckedState(!isCheckedState);
  }, [isCheckedState]);

  return (
    <S.Checkbox $color={color} $isChecked={isCheckedState}>
      {isCheckedState && (
        <S.FlexBox>
          <CheckIcon />
        </S.FlexBox>
      )}
      <S.CheckboxInput type="checkbox" onChange={handleClick} checked={isCheckedState} />
    </S.Checkbox>
  );
};

const S = {
  Checkbox: styled.label<{ $color: string; $isChecked: boolean }>`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({ $color }) => $color && $color};

    background-color: ${({ $color, $isChecked }) => ($isChecked ? $color : 'transparent')};

    &:hover {
      border-color: ${({ theme }) => theme.palette.grey500};
    }
  `,
  CheckboxInput: styled.input`
    opacity: 0;
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  `,
  FlexBox: styled.div`
    ${flexCenter};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  `,
};

export default Checkbox;
