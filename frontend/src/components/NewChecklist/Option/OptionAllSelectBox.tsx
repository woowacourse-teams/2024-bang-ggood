import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import { OPTION_COUNT } from '@/constants/options';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter, flexSpaceBetween, title4 } from '@/styles/common';
import theme from '@/styles/theme';

const OptionAllSelectBox = () => {
  const { selectedOptions, isAllSelected, addAllOptions, removeAllOptions } = useOptionStore();

  const handleToggleAllSelect = isAllSelected() ? removeAllOptions : addAllOptions;

  return (
    <S.ButtonContainer>
      <S.TotalSelectBox>
        {/*전체 선택 버튼*/}
        <Checkbox
          isChecked={isAllSelected()}
          setIsChecked={handleToggleAllSelect}
          onClick={handleToggleAllSelect}
          color={theme.palette.yellow500}
          hoverColor={theme.palette.yellow600}
        />

        <span>전체선택</span>
      </S.TotalSelectBox>
      <CounterBox currentCount={selectedOptions.length} totalCount={OPTION_COUNT} />
    </S.ButtonContainer>
  );
};

export default OptionAllSelectBox;

const S = {
  ButtonContainer: styled.div`
    height: 5rem;
    padding: 1rem 3rem;
    ${flexSpaceBetween}
    align-items: center;
  `,
  TotalSelectBox: styled.div`
    ${flexCenter}
    gap:1rem;

    span {
      ${title4};
      color: ${({ theme }) => theme.palette.grey600};
    }
  `,
};