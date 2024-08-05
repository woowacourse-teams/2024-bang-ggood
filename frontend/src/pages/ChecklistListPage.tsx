import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getChecklists } from '@/apis/checklist';
import { Plus } from '@/assets/assets';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import EditBanner from '@/components/ChecklistList/EditBanner';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import FloatingButton from '@/components/common/Button/FloatingButton';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import FooterDefault from '@/components/FooterDefault';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const [checklistList, setChecklistList] = useState<ChecklistPreview[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistList = await getChecklists();
      setChecklistList(checklistList);
    };

    fetchChecklist();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    // TODO: 비교 방 선택 페이지 작업으로 이후 변경 필요 (3차 스프린트)
    const length = checklistList?.length - 1;
    navigate(ROUTE_PATH.roomCompare, {
      state: {
        id1: checklistList[length].checklistId,
        id2: checklistList[length - 1].checklistId,
        id3: checklistList[length - 2]?.checklistId,
      },
    });
  };

  const handleClickMoveEditPage = () => {
    navigate(ROUTE_PATH.checklistCustom);
  };

  const handleClickFloatingButton = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <S.FlexBox>
        <EditBanner onClick={handleClickMoveEditPage} />
        <CompareBanner onClick={handleClick} />
      </S.FlexBox>
      <Layout>
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
    ${flexColumn}
    gap: 8px;
    overflow-y: scroll;
  `,
  FlexBox: styled.div`
    display: flex;
  `,
};
