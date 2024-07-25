import styled from '@emotion/styled';
import { useCallback } from 'react';

import { CheckIcon } from '@/assets/assets';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  setIsChecked: React.Dispatch<boolean>;
  color?: string;
  hoverBorderColor?: string;
  onClick: () => void;
}

const Checkbox = ({
  isChecked = false,
  color = theme.palette.green500,
  hoverBorderColor = theme.palette.green600,
  setIsChecked,
  onClick,
}: StyledProps) => {
  const handleClick = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <S.Checkbox $color={color} $isChecked={isChecked} $hoverBorderColor={hoverBorderColor} onClick={onClick}>
      {isChecked && (
        <S.FlexBox>
          <CheckIcon />
        </S.FlexBox>
      )}
      <S.CheckboxInput type="checkbox" onChange={handleClick} checked={isChecked} />
    </S.Checkbox>
  );
};

const S = {
  Checkbox: styled.label<{ $color: string; $isChecked: boolean; $hoverBorderColor: string }>`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({ $color }) => $color && $color};

    background-color: ${({ $color, $isChecked }) => ($isChecked ? $color : 'transparent')};

    &:hover {
      border-color: ${({ $hoverBorderColor }) => $hoverBorderColor};
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
