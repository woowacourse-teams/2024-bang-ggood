import { useEffect, useState } from 'react';

interface Props {
  allOptions: (number | string)[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  selectedOptions: (number | string)[];
}

/**
 * useAllSelect는 모든 옵션을 선택하거나 선택 해제하는 상태를 관리하는 커스텀 훅입니다.
 *
 * @param {(number | string)[]} props.allOptions - 모든 가능한 옵션의 목록.
 * @param {React.Dispatch<React.SetStateAction<(number | string)[]>>} props.setSelectedOptions - 선택된 옵션을 업데이트하는 함수.
 * @param {(number | string)[]} props.selectedOptions - 현재 선택된 옵션의 목록.
 *
 * * @returns {{
 *   onClickSelectAllOptions: () => void,
 *   isAllSelected: boolean,
 *   setIsAllSelected: React.Dispatch<React.SetStateAction<boolean>>
 * }} - 모든 옵션을 선택/해제하는 함수, 모든 옵션이 선택되었는지 여부를 나타내는 상태, isAllSelected 상태를 설정하는 상태 설정자를 반환합니다.
 **/

const useAllSelect = ({ allOptions, setSelectedOptions, selectedOptions }: Props) => {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const onClickSelectAllOptions = () => {
    if (isAllSelected) {
      return setSelectedOptions([]);
    }

    return setSelectedOptions(allOptions);
  };

  useEffect(() => {
    setIsAllSelected(selectedOptions.length === allOptions.length);
  }, [selectedOptions]);

  return { onClickSelectAllOptions, isAllSelected, setIsAllSelected };
};

export default useAllSelect;
