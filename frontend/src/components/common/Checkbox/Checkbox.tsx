import styled from '@emotion/styled';
import { MouseEvent, useCallback, useState } from 'react';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $width: keyof typeof widthSize;
  isChecked?: boolean;
  $color?: 'string';
}
const widthSize = { small: '45px', medium: '110px', large: '140px', full: '100%' };

const S = {
  Checkbox: styled.label<{ isChecked: boolean }>`
    display: inline-block;
    position: relative;
    cursor: pointer;
    border: 3px solid ${({ theme }) => theme.palette.grey200};
    border-radius: 3px;

    &:hover {
      border-color: ${({ theme }) => theme.palette.grey500};
    }
    ${({ isChecked, theme }) => (isChecked ? `&&{ border-color:${theme.palette.green500}; }` : '')}
  `,
  CheckboxInput: styled.input`
    opacity: 0;
    position: absolute;
    cursor: pointer;
  `,

  CheckMark: styled.span<{ isChecked: boolean }>`
    display: flex;
    width: 20px;
    height: 20px;
    cursor: pointer;
    justify-content: center;

    ${({ isChecked, theme }) =>
      isChecked
        ? ` &::after {
          content: '✔';
          color: white;
        }
        background-color:${theme.palette.green500};
        `
        : ''}
  `,
};

const Checkbox = ({ isChecked = false, $width, ...rest }: StyledProps) => {
  const [isCheckedState, setIsCheckedState] = useState<boolean>(isChecked);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      setIsCheckedState(!isCheckedState);
    },
    [isCheckedState],
  );
  return (
    <S.Checkbox isChecked={isCheckedState}>
      <S.CheckboxInput onClick={handleClick} />
      <S.CheckMark isChecked={isCheckedState} />
    </S.Checkbox>
  );
};

export default Checkbox;
