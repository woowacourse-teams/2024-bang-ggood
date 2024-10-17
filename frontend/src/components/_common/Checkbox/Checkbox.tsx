import styled from '@emotion/styled';

import { CheckIcon, PlusWhite } from '@/assets/assets';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
  iconType?: 'check' | 'plus';
  ariaLabel?: string;
}

const Checkbox = ({
  isChecked = false,
  color = theme.palette.green500,
  hoverColor,
  iconType = 'check',
  onClick,
  ariaLabel,
}: StyledProps) => {
  const checkedColor = isChecked ? color || theme.palette.green500 : theme.palette.grey400;

  return (
    <S.Checkbox $color={checkedColor} $hoverColor={hoverColor} onClick={onClick} aria-label={ariaLabel}>
      <S.FlexBox>
        {iconType === 'check' ? <CheckIcon aria-hidden="true" /> : <PlusWhite aria-hidden="true" />}
      </S.FlexBox>
      <S.CheckboxInput type="checkbox" checked={isChecked} />
    </S.Checkbox>
  );
};

const S = {
  Checkbox: styled.label<{ $color: string; $hoverColor?: string }>`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 0.2rem solid ${({ $color }) => $color};

    background-color: ${({ $color }) => $color};

    ${({ $hoverColor }) =>
      $hoverColor &&
      `&:hover {
      border-color:  ${$hoverColor};
      background-color: ${$hoverColor};
    }   
      `}
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
