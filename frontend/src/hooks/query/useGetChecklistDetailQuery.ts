import { useQuery } from '@tanstack/react-query';

import { getChecklistDetail } from '@/apis/checklist';

const useGetChecklistDetailQuery = (id: number) => {
  return useQuery({ queryKey: ['checklists', id.toString()], queryFn: () => getChecklistDetail(id) });
};

export default useGetChecklistDetailQuery;
