import styled from '@emotion/styled';

import OptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';
import { flexCenter } from '@/styles/common';

export const OptionContainer = () => {
  //const [isSelected, setIsSelected] = useState(false);

  const icons = OPTIONS.map(option => {
    return <OptionButton option={option} key={option.id} />;
  });

  return <S.GridContainer>{icons}</S.GridContainer>;
};

const S = {
  GridContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(30px, 85px));
    gap: 20px;
    width: 100%;
  `,
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
    width: 70%;
    height: 70%;
    aspect-ratio: 1 / 1;
    ${flexCenter}
  `,
  TextBox: styled.span`
    position: absolute;
    bottom: 10%;

    color: ${({ theme }) => theme.palette.grey500};
    font-weight: bold;
  `,
};
