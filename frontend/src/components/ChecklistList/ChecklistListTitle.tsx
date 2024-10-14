import styled from '@emotion/styled';

import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { title3 } from '@/styles/common';

const ChecklistListTitle = () => {
  const { data: checklistList } = useGetChecklistListQuery();

  return (
    <S.Title>
      방 둘러볼 때 꼭 필요한 체크리스트 <S.Count>{checklistList?.length}</S.Count>
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
  FlexBox: styled.div`
    display: flex;
    margin: 1.6rem 0 1rem;
  `,
};
