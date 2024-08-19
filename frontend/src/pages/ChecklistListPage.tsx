import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getChecklists } from '@/apis/checklist';
import { Plus } from '@/assets/assets';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import FloatingButton from '@/components/common/Button/FloatingButton';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
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

  const handleClickCard = (id: number) => {
    navigate(ROUTE_PATH.checklistOne(id), {
      state: { id: id },
    });
  };

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <CompareBanner onClick={handleClick} />
      <Layout>
        <S.ListBox>
          {checklistList?.map(checklist => (
            // <Link to={ROUTE_PATH.checklistOne(checklist.checklistId)} key={checklist.checklistId}>
            <ChecklistPreviewCard
              key={checklist.checklistId}
              checklist={checklist}
              onClick={() => handleClickCard(checklist.checklistId)}
            />
            // </Link>
          ))}
        </S.ListBox>
      </Layout>
      <Link to={ROUTE_PATH.checklistNew}>
        <FloatingButton>
          <Plus />
        </FloatingButton>
      </Link>
      <Footer>
        {[
          { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: 'home' },
          { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: 'location' },
          {
            node: <Footer.ChecklistLogo />,
            nodeActive: <Footer.ChecklistLogoActive />,
            path: 'checklist-list',
          },
          { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: 'my-page' },
        ]}
      </Footer>
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
};
