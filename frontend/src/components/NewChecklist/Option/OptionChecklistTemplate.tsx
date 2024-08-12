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
        💡 <S.Bold>TIP</S.Bold> : 수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!
      </S.TipBox>
    </S.Container>
  );
};

export default OptionChecklistTemplate;

const S = {
  Container: styled.div`
    display: flex;
    height: calc(100vh - 95px);
    margin-top: 30px;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 10px;
    align-items: center;
    flex-direction: column;
  `,

  InnerBox: styled.div`
    width: 90%;
    margin-top: 30px;
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
    width: 80%;
    padding: 16px;

    background-color: white;

    font-size: 14px;
    line-height: 1.3;
    border-radius: 10px;
  `,
  Bold: styled.span`
    ${title4}
  `,
  OptionContent: styled.div`
    ${title4}
  `,
};
