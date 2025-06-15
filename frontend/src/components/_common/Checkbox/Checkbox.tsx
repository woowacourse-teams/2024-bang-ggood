import styled from '@emotion/styled';

import { CheckIcon, PlusWhiteIcon } from '@/assets/assets';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

interface StyledProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isChecked: boolean;
  color?: string;
  onClick?: () => void;
  iconType?: 'check' | 'plus';
  ariaLabel?: string;
}

const Checkbox = ({
  isChecked = false,
  color = theme.color.primary[500],
  iconType = 'check',
  onClick,
  ariaLabel,
  ...props
}: StyledProps) => {
  const checkedColor = isChecked ? color : theme.color.gray[300];
  const hoverColor = isChecked ? theme.color.primary[600] : theme.color.gray[500];

  return (
    <S.Checkbox $color={checkedColor} $hoverColor={hoverColor} onClick={onClick} aria-label={ariaLabel} {...props}>
      <S.FlexBox>
        {iconType === 'check' ? <CheckIcon aria-hidden="true" /> : <PlusWhiteIcon aria-hidden="true" />}
      </S.FlexBox>
      <S.CheckboxInput type="checkbox" checked={isChecked} readOnly />
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
