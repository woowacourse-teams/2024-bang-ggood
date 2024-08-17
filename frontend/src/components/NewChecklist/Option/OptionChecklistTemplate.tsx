import styled from '@emotion/styled';

import TipBox from '@/components/_common/TipBox/TipBox';
import OptionAllSelectBox from '@/components/NewChecklist/Option/OptionAllSelectBox';
import { OptionList } from '@/components/NewChecklist/Option/OptionList';
import { flexCenter, flexColumn, title4 } from '@/styles/common';

const OptionChecklistTemplate = () => {
  return (
    <S.Container>
      <TipBox tipType={'OPTION'} />
      <S.InnerBox>
        <OptionAllSelectBox />
        <S.OptionBox>
          <OptionList />
        </S.OptionBox>
      </S.InnerBox>
    </S.Container>
  );
};

export default OptionChecklistTemplate;

const S = {
  Container: styled.div`
    ${flexColumn}
    margin-top: 40px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.background};
    min-height: calc(100vh - 64px);
    align-items: center;
  `,

  InnerBox: styled.div`
    width: 100%;
    ${flexColumn}
    margin-top: 10px;

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
