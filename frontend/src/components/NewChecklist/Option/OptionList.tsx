import styled from '@emotion/styled';

import OptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';

export const OptionList = () => {
  const icons = OPTIONS.map(option => {
    return <OptionButton option={option} key={option.id} />;
  });

  return <S.GridContainer>{icons}</S.GridContainer>;
};

export default OptionList;

const S = {
  GridContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(2.5rem, 8.5rem));
    gap: 1.5rem;
    width: 100%;

    @media (width >= 44rem) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (width >= 48rem) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (width >= 58rem) {
      grid-template-columns: repeat(6, 1fr);
    }
  `,
};
