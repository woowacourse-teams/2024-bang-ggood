import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import TipBox from '@/components/_common/TipBox/TipBox';
import OptionAllSelectBox from '@/components/NewChecklist/Option/OptionAllSelectBox';
import { OptionList } from '@/components/NewChecklist/Option/OptionList';
import { flexCenter, flexColumn, flexRow, flexSpaceBetween, title4 } from '@/styles/common';
import theme from '@/styles/theme';

const OptionTemplate = () => {
  return (
    <Layout bgColor={theme.palette.background} withHeader withTab>
      <TipBox tipType={'OPTION'} />
      <S.InnerBox>
        <OptionAllSelectBox />
        <S.OptionBox>
          <OptionList />
        </S.OptionBox>
      </S.InnerBox>
    </Layout>
  );
};

export default OptionTemplate;

const S = {
  InnerBox: styled.div`
    width: 100%;
    ${flexColumn}
    margin-top: 1rem;

    background-color: ${({ theme }) => theme.palette.white};

    border-radius: 1rem;
  `,

  OptionBox: styled.div`
    ${flexRow}
    padding: 3rem;
    padding-top: 0;
    padding-left: 4rem;

    flex-wrap: wrap;

    ${flexCenter}

    justify-content: left;
    gap: 1.3rem;

    border-radius: 1rem;
  `,
  TipBox: styled.div`
    width: 100%;
    margin-top: 1rem;
    ${flexCenter}
    ${flexSpaceBetween}

    background-color: ${({ theme }) => theme.palette.white};

    font-size: 1.4rem;
    border-radius: 1rem;
  `,
  TipText: styled.div`
    padding: 1.2rem;
  `,
  Bold: styled.span`
    ${title4}
  `,
  OptionContent: styled.div`
    ${title4}
  `,
};
