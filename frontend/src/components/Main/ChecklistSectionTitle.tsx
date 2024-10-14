import styled from '@emotion/styled';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { title3 } from '@/styles/common';

const ChecklistSectionTitle = () => {
  const { data: checklistList } = useGetChecklistListQuery();
  return (
    <S.ContainerTitle>
      나의 체크리스트 <S.Count>{checklistList?.length}</S.Count>
    </S.ContainerTitle>
  );
};

export default ChecklistSectionTitle;

const S = {
  ContainerTitle: styled.div`
    ${title3}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
};
