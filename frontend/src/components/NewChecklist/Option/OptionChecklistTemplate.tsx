import styled from '@emotion/styled';

import OptionButton from '@/components/_common/OptionButton/OptionButton';
import OptionModalInfoBox from '@/components/NewChecklist/Option/OptionModalInfoBox';
import { OPTIONS } from '@/constants/options';
import { title4 } from '@/styles/common';

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
    </S.Container>
  );
};

export default OptionChecklistTemplate;

const S = {
  Container: styled.div`
    display: flex;
    height: calc(100vh - 100px);
    margin-top: 30px;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 10px;
    align-items: center;
    flex-direction: column;
  `,

  InnerBox: styled.div`
    width: 80%;
    margin-top: 60px;

    background-color: white;

    border-radius: 10px;
  `,

  OptionBox: styled.div`
    display: flex;

    padding: 30px;
    flex-wrap: wrap;

    justify-content: left;
    gap: 15px;

    border-radius: 10px;
  `,

  OptionContent: styled.div`
    ${title4}
  `,
};
