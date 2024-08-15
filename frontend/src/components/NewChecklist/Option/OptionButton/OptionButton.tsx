import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';
import { OptionWithIcon } from '@/types/option';

const OptionButton = ({ option }: { option: OptionWithIcon }) => {
  const { Icon, displayName } = option;
  //const { removeOption } = useOptionStore(); //isSelectedOption, addOption,

  if (!option) {
    return null;
  }

  return (
    <S.Box>
      <S.IconBox>
        <Icon />
      </S.IconBox>
      <S.TextBox>{displayName}</S.TextBox>
    </S.Box>
  );
};

const S = {
  Box: styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.palette.grey400};

    font-size: 14px;
    ${flexCenter}
    flex-direction: column;

    @media (width <= ${({ theme }) => theme.viewport.TABLET}) {
      width: 100%;
      padding-top: 100%;
    }

    @media (width <= ${({ theme }) => theme.viewport.MOBILE}) {
      width: 100%;
      padding-top: 100%;
    }
  `,
  IconBox: styled.div`
    position: absolute;
    top: 10%;
    width: 50%;
    height: 50%;
    aspect-ratio: 1 / 1;
    ${flexCenter}
  `,
  TextBox: styled.span`
    position: absolute;
    bottom: 15%;

    color: ${({ theme }) => theme.palette.grey500};
    font-weight: bold;
  `,
};

//   @media (width <= 406px) {
//     width: 85px;
//     height: 85px;
//   }

//   @media (width <= 380px) {
//     width: 80px;
//     height: 80px;
//   }

//   @media (width <= 364px) {
//     width: 75px;
//     height: 75px;
//   }

//   @media (width <= 347px) {
//     width: 70px;
//     height: 70px;
//   }

//   @media (width <= 332px) {
//     width: 60px;
//     height: 60px;
//   }

//   @media (width <= 298px) {
//     width: 50px;
//     height: 50px;
//   }
// `;

// const S = {
//   Box,
//   Icon,
// };

export default OptionButton;
