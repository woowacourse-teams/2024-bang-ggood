import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import Text from '@/components/_common/Text/Text';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter } from '@/styles/common';

const NoChecklistTemplate = () => {
  const navigate = useNavigate();
  const handleMoveNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <S.Container>
      <Text typography={font => font.body[2].M} color={color => color.gray[500]}>
        <S.TextBox>
          <div>체크리스트가 아직 없어요!</div>
          <div>첫 체크리스트를 작성하러 가볼까요?</div>
        </S.TextBox>
      </Text>
      <Button
        color="dark"
        label={
          <S.Text typography={font => font.body[2].B} color={color => color.mono.white}>
            새 체크리스트 만들기
          </S.Text>
        }
        onClick={handleMoveNewChecklist}
        size="small"
      />
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
  Text: styled(Text)`
    padding: 0 0.8rem;
  `,
};

export default NoChecklistTemplate;
