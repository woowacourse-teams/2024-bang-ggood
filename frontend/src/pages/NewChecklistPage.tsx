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
  const [address, setAddress] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [durationOfContract, setDurationOfContract] = useState('');
  const [numberOfStories, setNumberOfStories] = useState('');
  const [nearTransportation, setNearTransportation] = useState('');
  const [officeOfRealEstate, setOfficeOfRealEstate] = useState('');

  return (
    <div>
      <Header
        left={<Header.Backward />}
        center={<S.Center>새 체크리스트</S.Center>}
        right={<S.SaveTextButton>저장</S.SaveTextButton>}
      />
      <Tabs menuList={menuList}></Tabs>
      <div style={{ backgroundColor: 'white', padding: '28px 16px' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '24px',
            justifyContent: 'center',
          }}
        >
          {makeCustomForm({ label: '방 이름', state: useState(''), required: true })}
          <FormField>
            <FormField.Label label="보증금 / 월세" />
            <S.FlexHorizontal>
              <S.FlexVertical>
                <FormField.Input placeholder="" state={[securityDeposit, setSecurityDeposit]} />
                <FormField.P value="" />
              </S.FlexVertical>

              <S.FlexVertical>
                <FormField.Input placeholder="" state={[monthlyRent, setMonthlyRent]} />
                <FormField.P value="" />
              </S.FlexVertical>
            </S.FlexHorizontal>
          </FormField>
          <S.FlexHorizontal>
            {makeCustomForm({ label: '계약 기간(년)', state: useState('') })}
            {makeCustomForm({ label: '층수', state: useState('') })}
          </S.FlexHorizontal>
          <FormField>
            <FormField.Label label="가까운 교통편" />
            <S.FlexHorizontal>
              <S.CustomInput placeholder="지하철역" state={[securityDeposit, setSecurityDeposit]} />
              <FormField.Label label="까지" style={{ color: 'blue' }} />
              <S.CustomInput placeholder="분" state={[monthlyRent, setMonthlyRent]} />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </FormField>
          {makeCustomForm({ label: '부동산 이름', state: useState('') })}
          <S.SubmitButton label="가구 옵션 추가하기" size="full" />
        </div>
      </div>
    </div>
  );
};
const makeCustomForm = (res: MakeFormArgs) => (
  <FormField key={res.label}>
    <FormField.Label label={res.label} required={res.required} />
    <FormField.Input placeholder="" state={res.state} />
    <FormField.P value={res.state[0]} />
  </FormField>
);

const S = {
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
    width: calc(96%);
    border-radius: 4px;

    background-color: ${({ theme }) => theme.palette.yellow500};

    &:hover {
      background-color: ${({ theme }) => theme.palette.yellow600};
    }

    color: black;
  `,
  FlexHorizontal: styled.div`
    ${flexRow}
    ${flexCenter}
    width: 100%;
    column-gap: 6%;
  `,
  FlexVertical: styled.div`
    ${flexColumn}

    width: 100%;
    row-gap: 2%;
  `,
  CustomInput: styled(FormField.Input)`
    width: 38%;
  `,
};

export default NewChecklistPage;
