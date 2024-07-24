import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs from '@/components/common/Tabs/Tabs';
import FormField, { MakeFormArgs } from '@/components/FormField';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';

const menuList = [
  { name: '기본 정보', path: './' },
  { name: '체크 리스트', path: './' },
  { name: '메모 및 사진', path: './' },
];

const NewChecklistPage = () => {
  const [roomName, setRoomName] = useState('');
  // const [address, setAddress] = useState(''); 주소가 피그마에 빠짐.
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [durationOfContract, setDurationOfContract] = useState('');
  const [numberOfStories, setNumberOfStories] = useState('');
  const [nearTransportation, setNearTransportation] = useState('');
  const [nearTransportationDistance, setNearTransportationDistance] = useState('');
  const [officeOfRealEstate, setOfficeOfRealEstate] = useState('');

  return (
    <S.ContentWrapper>
      <Header
        left={<Header.Backward />}
        center={<S.Center>새 체크리스트</S.Center>}
        right={<S.SaveTextButton>저장</S.SaveTextButton>}
      />
      <Tabs menuList={menuList}></Tabs>

      <S.Container>
        {/* 스타일링이 매우 가변적이어서, 불가피하게 유틸함수를 부분적으로 사용 */}
        {makeCustomForm({ label: '방 이름', state: [roomName, setRoomName], required: true })}
        <FormField>
          <FormField.Label label="보증금 / 월세" />
          <S.FlexVertical>
            <S.FlexHorizontal
              css={css`
                gap: 0;
              `}
            >
              <S.CustomInput placeholder="" state={[securityDeposit, setSecurityDeposit]} />
              <S.CustomLabel label=" 만원   " />
              <S.CustomInput placeholder="" state={[monthlyRent, setMonthlyRent]} />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>
        <S.FlexHorizontal>
          {makeCustomForm({ label: '계약 기간(년)', state: [durationOfContract, setDurationOfContract] })}
          {makeCustomForm({ label: '층수', state: [numberOfStories, setNumberOfStories] })}
        </S.FlexHorizontal>
        <FormField>
          <FormField.Label label="가까운 교통편" />
          <S.FlexHorizontal
            css={css`
              gap: 0;
            `}
          >
            <S.CustomInput placeholder="지하철역" state={[nearTransportation, setNearTransportation]} />
            <S.CustomLabel label=" 까지   " />
            <S.CustomInput placeholder="분" state={[nearTransportationDistance, setNearTransportationDistance]} />
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>
        {makeCustomForm({ label: '부동산 이름', state: [officeOfRealEstate, setOfficeOfRealEstate] })}
        <S.SubmitButton label="가구 옵션 추가하기" size="full" />
      </S.Container>
    </S.ContentWrapper>
  );
};
const makeCustomForm = (res: MakeFormArgs) => (
  <S.CustomFormField key={res.label}>
    <FormField.Label label={res.label} required={res.required} />
    <FormField.Input placeholder="" state={res.state} />
    <FormField.P value={res.state[0]} />
  </S.CustomFormField>
);

const S = {
  ContentWrapper: styled.div`
    background-color: white;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;
    justify-content: 'center';
    padding: 28px 22px;
  `,
  Center: styled.div`
    ${flexCenter}
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  SaveTextButton: styled(Header.TextButton)`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  SubmitButton: styled(Button)`
    width: 96%;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.palette.yellow500};

    &:hover {
      background-color: ${({ theme }) => theme.palette.yellow600};
    }

    color: black;
  `,
  FlexHorizontal: styled.div`
    ${flexRow}
    justify-content: space-between;
    column-gap: 6%;
    width: 100%;
  `,
  FlexVertical: styled.div`
    ${flexColumn}
    row-gap: 2%;

    flex: auto;
  `,
  CustomInput: styled(FormField.Input)`
    flex: auto;
  `,
  CustomLabel: styled(FormField.Label)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    white-space: pre;
  `,
  CustomFormField: styled(FormField)`
    flex: auto;
  `,
};

export default NewChecklistPage;
