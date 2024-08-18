import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ChecklistMiniCard from '@/components/ChecklistList/ChecklistMiniCard';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { boxShadow, boxShadowSpread, flexColumn, flexRow, flexSpaceBetween, title3, title4 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistSection = () => {
  const navigate = useNavigate();
  const { data: checklists, isLoading, error } = useGetChecklistListQuery();

  const handleClickList = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  const handleNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  if (isLoading) return <div>Article Loading</div>;

  if (!checklists) throw error;

  return (
    <>
      <S.Title>집 구할 때 꼭 필요한 목록</S.Title>
      <S.Container>
        <S.Row>
          <S.ContainerTitle>
            나의 체크리스트 <S.Count>{checklists.length}</S.Count>
          </S.ContainerTitle>
          <Button size="xSmall" label="전체 보기" onClick={handleClickList} />
        </S.Row>
        {checklists?.map((checklist: ChecklistPreview, index: number) => (
          <ChecklistMiniCard key={checklist.checklistId} index={index} checklist={checklist} />
        ))}
        <S.NewButton label="+ 체크리스트 생성하기" isSquare size="full" onClick={handleNewChecklist} />
      </S.Container>
    </>
  );
};

export default ChecklistSection;

const S = {
  Title: styled.div`
    ${title4};
    margin: 16px 0 0 16px;
  `,
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 16px;
    padding: 24px 16px;

    border-radius: 16px;
    ${boxShadow};
    ${flexColumn};
    gap: 12px;

    ${boxShadowSpread}
  `,
  Row: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexRow};
    ${flexSpaceBetween};
    align-items: center;
  `,
  ContainerTitle: styled.div`
    ${title3}
  `,
  Count: styled.span`
    ${title3}
    color: ${({ theme }) => theme.palette.green500};
  `,
  NewButton: styled(Button)`
    width: 100%;
    padding: 18px 48px;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.palette.grey50};
  `,
};
