import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter } from '@/styles/common';

const NoChecklistTemplate = () => {
  const navigate = useNavigate();
  const handleMoveNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <S.Container>
      <S.TextBox>
        <div>체크리스트가 아직 없어요!</div>
        <div>첫 체크리스트를 작성하러 가볼까요?</div>
      </S.TextBox>
      <Button color="dark" label="새 체크리스트 만들기" onClick={handleMoveNewChecklist} size="small" />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    height: 50dvh;
    ${flexCenter}
    flex-direction: column;
    gap: 1rem;
  `,
  TextBox: styled.div`
    ${flexCenter}
    flex-direction: column;
  `,
};

export default NoChecklistTemplate;
