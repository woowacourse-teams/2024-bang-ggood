import { useState } from 'react';

import { filledOptions, unfilledOptions } from '@/assets/options/option';

const OptionButton = (optionId: number) => {
  const [isSelected, setIsSelected] = useState(false);
  const filledOption = filledOptions[optionId];
  const unfilledOption = unfilledOptions[optionId];

  const onClickSelect = () => {
    setIsSelected(prev => !prev);
  };

  return <div>{isSelected ? filledOption : unfilledOption}</div>;
};

export default OptionButton;
