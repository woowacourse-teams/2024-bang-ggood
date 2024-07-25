import { useEffect, useState } from 'react';

interface Props {
  allOptions: (number | string)[];
  setSelectedOptions: React.Dispatch<(number | string)[]>;
  selectedOptions: (number | string)[];
}
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
