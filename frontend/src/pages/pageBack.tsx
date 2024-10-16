import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import Like from '@/assets/icons/like/Like';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistCard from '@/components/ChecklistList/ChecklistCard';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { boxShadow, flexColumn, flexRow, title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const navigate = useNavigate();

  const [isFilter, setIsFilter] = useState(false);
  const handleClickFilter = () => setIsFilter(isFilter => !isFilter);
  const { data: checklistList, isLoading } = useGetChecklistListQuery(isFilter);

  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);
  const handleClickFloatingButton = () => navigate(ROUTE_PATH.checklistNew);

  const likedList = checklistList?.filter(checklist => checklist.isLiked);
  const checklistList2 = isFilter ? likedList : checklistList;
  if (isLoading) return <SkChecklistList />;

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <FlexBox.Horizontal align="center" justify="space-between">
          <S.Title>
            내가 둘러본 방들 <S.Count>{checklistList2?.length}</S.Count>
          </S.Title>
          <S.LikeBox onClick={handleClickFilter} $isChecked={isFilter}>
            <Like fill={theme.palette.red500} stroke={theme.palette.red500} width="2rem" />
            좋아요
          </S.LikeBox>
        </FlexBox.Horizontal>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <S.ListBox>
          {checklistList2?.length ? (
            checklistList2?.map((checklist: ChecklistPreview) => (
              <ChecklistCard key={checklist.checklistId} checklist={checklist} />
            ))
          ) : (
            <NoChecklistTemplate />
          )}
        </S.ListBox>
      </Layout>
      <FloatingButton size="extends" onClick={handleClickFloatingButton}>
        <PlusBlack />방 체크하기
      </FloatingButton>
    </>
  );
};

export default ChecklistListPage;

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
  ListBox: styled.section`
    ${flexColumn}
    gap: 1.2rem;
    overflow-y: scroll;
    margin-bottom: 8rem;
  `,
  LikeBox: styled.section<{ $isChecked: boolean }>`
    ${flexRow}
    flex: 0 0 auto;

    align-items: center;

    gap: 1rem;
    box-sizing: border-box;
    border-radius: 1.5rem;

    height: 3rem;
    padding: 1.2rem 1.6rem;

    background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.palette.red200 : theme.palette.white)};

    ${boxShadow};
    cursor: pointer;
  `,
  DefaultButton: styled.div`
    position: fixed;
    top: 2rem;
    right: 4rem;
    z-index: 1000;
  `,
};
