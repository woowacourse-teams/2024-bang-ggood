import styled from '@emotion/styled';

import Checkbox from '@/components/common/Checkbox/Checkbox';
import SelectionCounter from '@/components/common/SelectionCounter/SelectionCounter';
import { totalOptionCount } from '@/components/NewChecklist/OptionModal/OptionModal';
import useOptionStore from '@/store/useOptionStore';
import { flexCenter, title4 } from '@/styles/common';
import theme from '@/styles/theme';

// interface Props {
//   selectedOptions: number[];
//   setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
// }

const OptionModalInfoBox = () => {
  // const allOptions = new Array(totalOptionCount).fill(0).map((e, i) => i + 1);
  // const { onClickSelectAllOptions, isAllSelected, setIsAllSelected } = useAllSelect({
  //   allOptions,
  //   setSelectedOptions,
  //   selectedOptions,
  // });
  const { selectedOptions, isAllSelected, addAllOptions } = useOptionStore();

  return (
    <S.ButtonContainer>
      <S.TotalSelectBox>
        <Checkbox
          isChecked={isAllSelected()}
          setIsChecked={addAllOptions}
          onClick={addAllOptions}
          color={theme.palette.yellow500}
          hoverBorderColor={theme.palette.yellow600}
        />

        <span>전체선택</span>
      </S.TotalSelectBox>
      <SelectionCounter currentCount={selectedOptions.length} totalCount={totalOptionCount} />
    </S.ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  width: 280px;
  height: 50px;

  justify-content: space-between;
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
