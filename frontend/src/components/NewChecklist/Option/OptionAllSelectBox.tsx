import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import { OPTION_COUNT } from '@/constants/options';
import useSelectedOptionStore from '@/store/useSelectedOptionStore';
import { flexCenter, flexSpaceBetween, title4 } from '@/styles/common';

const OptionAllSelectBox = () => {
  const selectedOptions = useSelectedOptionStore(state => state.selectedOptions);
  const selectedOptionActions = useSelectedOptionStore(state => state.actions);

  const isAllSelected = selectedOptionActions.isAllSelected();
  const handleToggleAllSelect = isAllSelected ? selectedOptionActions.removeAll : selectedOptionActions.addAllOptions;

  return (
    <S.ButtonContainer>
      <S.TotalSelectBox>
        {/*전체 선택 버튼*/}
        <Checkbox
          ariaLabel={`전체 옵션을 선택 ${isAllSelected ? '해제' : ''}하려면 두번 누르세요.`}
          isChecked={isAllSelected}
          onClick={handleToggleAllSelect}
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
