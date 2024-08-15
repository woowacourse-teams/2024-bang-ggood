import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import LengthCounter from '@/components/_common/LengthCounter/LengthCounter';
import { OPTION_COUNT } from '@/constants/options';
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
      <LengthCounter currentCount={selectedOptions.length} totalCount={OPTION_COUNT} />
    </S.ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  height: 50px;
  padding: 10px 30px;
  ${flexSpaceBetween}
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
