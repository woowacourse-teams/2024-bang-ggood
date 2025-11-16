import styled from '@emotion/styled';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { fontStyle } from '@/utils/fontStyle';

const ChecklistSectionTitle = () => {
  const { data: checklistList } = useGetChecklistListQuery();
  return (
    <S.ContainerTitle>
      내가 둘러본 방 <S.Count>{checklistList?.length}</S.Count>
    </S.ContainerTitle>
  );
};

export default ChecklistSectionTitle;

const S = {
  ContainerTitle: styled.div`
    ${({ theme }) => fontStyle(theme.font.headline[1].B)}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.color.primary[600]};
  `,
};
