import useChecklist from '@/store/useChecklist';

const useSelectOption = () => {
  const { selectedOptions, setSelectedOptions } = useChecklist();
  return <div>useSelectOption</div>;
};

export default useSelectOption;
