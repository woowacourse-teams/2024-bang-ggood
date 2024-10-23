import styled from '@emotion/styled';

import useGetChecklistList from '@/hooks/useGetChecklistList';
import { title3 } from '@/styles/common';

const ChecklistListTitle = () => {
  const { data: checklistList } = useGetChecklistList();

  return (
    <S.Title>
      내가 둘러본 방 <S.Count>{checklistList?.length}</S.Count>
    </S.Title>
  );
};

export default ChecklistListTitle;

const S = {
  Title: styled.h1`
    ${title3}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
};
