import styled from '@emotion/styled';

import MemoziedOptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';

export const OptionList = () => {
  const OptionStoreActions = useSelectedOptionStore(state => state.actions);

  const icons = OPTIONS.map(option => {
    const isCurrentOptionSelected = OptionStoreActions.isSelectedOption(option.id);
    return <MemoziedOptionButton option={option} key={option.id} isSelected={isCurrentOptionSelected} />;
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

    @media (width >= 32rem) {
      grid-template-columns: repeat(5, 1fr);
    }
  `,
};
