import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ChecklistPreviewCard from '@/components/Main/ChecklistPreviewCard';
import SkChecklistSection from '@/components/skeleton/Main/SkChecklistSection';
import { ROUTE_PATH } from '@/constants/routePath';
import { MAX_CHECKLISTS_DISPLAY_COUNT } from '@/constants/system';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { boxShadow, boxShadowSpread, flexColumn, flexRow, flexSpaceBetween, title3, title4 } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistSection = () => {
  const navigate = useNavigate();
  const { data: checklists, isLoading } = useGetChecklistListQuery();

  const handleClickList = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  const handleNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  if (isLoading) return <SkChecklistSection />;

  return (
    <>
      <S.Title>집 구할 때 꼭 필요한 목록</S.Title>
      <S.Container>
        <S.Row>
          <S.ContainerTitle>
            나의 체크리스트 <S.Count>{checklists?.length}</S.Count>
          </S.ContainerTitle>
          <Button size="xSmall" label="전체 보기" onClick={handleClickList} />
        </S.Row>
        {checklists
          ?.slice(0, MAX_CHECKLISTS_DISPLAY_COUNT)
          .map((checklist: ChecklistPreview, index: number) => (
            <ChecklistPreviewCard key={checklist.checklistId} index={index} checklist={checklist} />
          ))}
        <S.NewButton label="+ 새로운 체크리스트 생성하기" isSquare size="full" onClick={handleNewChecklist} />
      </S.Container>
    </>
  );
};

export default ChecklistSection;

const S = {
  Title: styled.div`
    ${title4};
    margin: 1rem 1.6rem 0;
  `,
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 1.6rem;
    padding: 2.4rem 1.6rem;

    border-radius: 1.6rem;
    ${boxShadow};
    ${flexColumn};
    gap: 1.2rem;

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
    padding: 1.8rem 4.8rem;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.grey50};
  `,
};
