import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getChecklists } from '@/apis/checklist';
import { Plus } from '@/assets/assets';
import FloatingButton from '@/components/_common/Button/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import EditBanner from '@/components/ChecklistList/EditBanner';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import FooterDefault from '@/components/FooterDefault';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const navigate = useNavigate();
  const [checklistList, setChecklistList] = useState<ChecklistPreview[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistList = await getChecklists();
      setChecklistList(checklistList);
    };

    fetchChecklist();
  }, [navigate]);

  const handleClickMoveEditPage = () => {
    navigate(ROUTE_PATH.checklistCustom);
  };

  const handleClickMoveCompareSelectPage = () => {
    navigate(ROUTE_PATH.roomCompareSelect);
  };

  const handleClickFloatingButton = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <S.FlexBox>
        <EditBanner onClick={handleClickMoveEditPage} />
        <CompareBanner onClick={handleClickMoveCompareSelectPage} />
      </S.FlexBox>
      <Layout style={{ padding: '0 16px' }}>
        <S.ListBox>
          {checklistList.length ? (
            <>
              {checklistList?.map(checklist => (
                <Link to={ROUTE_PATH.checklistOne(checklist.checklistId)} key={checklist.checklistId}>
                  <ChecklistPreviewCard checklist={checklist} />
                </Link>
              ))}
            </>
          ) : (
            <NoChecklistTemplate />
          )}
        </S.ListBox>
      </Layout>
      <FloatingButton onClick={handleClickFloatingButton}>
        <Plus />
      </FloatingButton>
      <FooterDefault />
    </>
  );
};

export default ChecklistListPage;

const S = {
  ListBox: styled.div`
    margin-top: 20px;
    ${flexColumn}
    gap: 8px;
    overflow-y: scroll;
  `,
  FlexBox: styled.div`
    display: flex;
  `,
};
