import styled from '@emotion/styled';

import OptionButton from '@/components/_common/OptionButton/OptionButton';
import OptionModalInfoBox from '@/components/NewChecklist/Option/OptionModalInfoBox';
import { OPTIONS } from '@/constants/options';
import { flexCenter, flexColumn, title4 } from '@/styles/common';

const OptionChecklistTemplate = () => {
  return (
    <S.Container>
      <S.InnerBox>
        <OptionModalInfoBox />
        <S.OptionBox>
          {OPTIONS.map(option => (
            <OptionButton option={option} key={option.id} />
          ))}
        </S.OptionBox>
      </S.InnerBox>
      <S.TipBox>
        <S.TipText>
          💡 <S.Bold>TIP</S.Bold> : 수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!
        </S.TipText>
      </S.TipBox>
    </S.Container>
  );
};

export default OptionChecklistTemplate;

const S = {
  Container: styled.div`
    display: flex;
    margin-top: 30px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.background};
    min-height: calc(100vh - 140px);
    gap: 10px;
    align-items: center;
    flex-direction: column;
  `,

  InnerBox: styled.div`
    width: 100%;
    margin-top: 15px;
    ${flexColumn}

    background-color: white;

    border-radius: 10px;
  `,

  OptionBox: styled.div`
    display: flex;
    padding: 30px;
    padding-top: 0;

    flex-wrap: wrap;

    ${flexCenter}

    justify-content: left;
    gap: 13px;

    border-radius: 10px;
  `,
  TipBox: styled.div`
    width: 100%;

    background-color: white;

    font-size: 14px;
    line-height: 1.3;
    border-radius: 10px;
  `,
  TipText: styled.div`
    padding: 12px;
  `,
  Bold: styled.span`
    ${title4}
  `,
  OptionContent: styled.div`
    ${title4}
  `,
};
