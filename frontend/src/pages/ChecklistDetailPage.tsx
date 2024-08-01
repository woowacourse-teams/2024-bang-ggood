import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getChecklistDetail } from '@/apis/checklist';
import ChecklistAnswerSection from '@/components/ChecklistDetail/ChecklistAnswerSection';
import RoomInfoSection from '@/components/ChecklistDetail/RoomInfoSection';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import theme from '@/styles/theme';
import { ChecklistInfo } from '@/types/checklist';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailPage = () => {
  const { checklistId } = useParams() as RouteParams;
  const [checklist, setChecklist] = useState<ChecklistInfo>();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistDetail(Number(checklistId));
      setChecklist(checklist);
    };
    fetchChecklist();
  }, [checklistId]);

  return (
    <>
      <Header left={<Header.Backward />} center={<Header.Text>{checklist?.room.name}</Header.Text>} />
      <Layout bgColor={theme.palette.grey100}>
        <S.Wrapper>
          <RoomInfoSection room={checklist?.room} score={checklist?.score} createdAt={checklist?.createdAt} />
          <ChecklistAnswerSection categories={checklist?.categories} />
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default ChecklistDetailPage;

const S = {
  Wrapper: styled.div`
    min-height: calc(100vh - 64px);
  `,
};
