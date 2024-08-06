import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import { OPTION_COUNT } from '@/components/_common/OptionButton/OptionIcon';
import SelectionCounter from '@/components/_common/SelectionCounter/SelectionCounter';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter, flexSpaceBetween, title4 } from '@/styles/common';
import theme from '@/styles/theme';

const OptionModalInfoBox = () => {
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
      <SelectionCounter currentCount={selectedOptions.length} totalCount={OPTION_COUNT} />
    </S.ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 90%;
  ${flexSpaceBetween}
  height: 50px;
  align-items: center;
`;

const TotalSelectBox = styled.div`
  ${flexCenter}
  gap:10px;

  span {
    ${title4};
    color: ${({ theme }) => theme.palette.grey600};
  }
`;

const S = {
  ButtonContainer,
  TotalSelectBox,
};

export default OptionModalInfoBox;
