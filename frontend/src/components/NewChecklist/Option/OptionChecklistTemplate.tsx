import styled from '@emotion/styled';

import OptionButton from '@/components/_common/OptionButton/OptionButton';
import TipBox from '@/components/_common/TipBox/TipBox';
import OptionModalInfoBox from '@/components/NewChecklist/Option/OptionBox';
import { OPTIONS } from '@/constants/options';
import { flexCenter, flexColumn, title4 } from '@/styles/common';

const OptionChecklistTemplate = () => {
  return (
    <S.Container>
      <TipBox tipText="수리가 필요한 시설이 있다면, 관리자에게 수리 가능 여부를 미리 물어보세요!" />
      <S.InnerBox isTipOpen={true}>
        <OptionModalInfoBox />
        <S.OptionBox>
          {OPTIONS.map(option => (
            <OptionButton option={option} key={option.id} />
          ))}
        </S.OptionBox>
      </S.InnerBox>
    </S.Container>
  );
};

export default OptionChecklistTemplate;

const S = {
  Container: styled.div`
    ${flexColumn}
    margin-top: 30px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.background};
    min-height: calc(100vh - 64px);
    gap: 10px;
    align-items: center;
  `,

  InnerBox: styled.div<{ isTipOpen: boolean }>`
    width: 100%;
    ${flexColumn}
    margin-top: ${({ isTipOpen }) => !isTipOpen && 15}px;

    background-color: white;

    border-radius: 10px;
  `,

  OptionBox: styled.div`
    display: flex;
    padding: 30px;
    padding-top: 0;
    padding-left: 40px;

    flex-wrap: wrap;

    ${flexCenter}

    justify-content: left;
    gap: 13px;

    border-radius: 10px;
  `,
  TipBox: styled.div`
    width: 100%;
    margin-top: 10px;
    ${flexCenter}
    justify-content: space-between;

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
