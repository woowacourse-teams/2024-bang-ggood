import styled from '@emotion/styled';

import MemoziedOptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';

export const OptionList = () => {
  const icons = OPTIONS.map(option => {
    return <MemoziedOptionButton option={option} key={option.id} />;
  });

  return <S.GridContainer>{icons}</S.GridContainer>;
};

export default OptionList;

const S = {
  GridContainer: styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(25px, 85px));
    gap: 15px;

    @media (width >= 26rem) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (width >= 40rem) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (width >= 60rem) {
      grid-template-columns: repeat(6, 1fr);
    }
  `,
};
