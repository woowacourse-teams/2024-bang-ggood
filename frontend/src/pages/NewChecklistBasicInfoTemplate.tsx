import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/common/FormField/FormField';
import Header from '@/components/common/Header/Header';
import { InputChangeEvent } from '@/components/common/Input/Input';
import BasicTabs from '@/components/common/Tabs/BasicTabs';
import useInputs from '@/hooks/useInput';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';

const basicInfos = {
  roomName: '',
  address: '',
  securityDeposit: '',
  monthlyRent: '',
  durationOfContract: 0,
  numberOfStories: 1,
  nearTransportation: '',
  nearTransportationDistance: 0,
  officeOfRealEstate: '',
};
type InputName = keyof typeof basicInfos;

const NewChecklistBasicInfoTemplate = () => {
  const { values, onChange } = useInputs(basicInfos);

  return (
    <S.ContentWrapper>
      <Header
        left={<Header.Backward />}
        center={<S.Center>새 체크리스트</S.Center>}
        right={<S.SaveTextButton>저장</S.SaveTextButton>}
      />
      <BasicTabs />

      <S.Container>
        {/* 스타일링이 매우 가변적이어서, 불가피하게 유틸함수를 부분적으로 사용 */}
        {makeCustomForm({ label: '방 이름', onChange, name: 'roomName', values, required: true })}
        <FormField>
          <FormField.Label label="보증금 / 월세" />
          <S.FlexVertical>
            <S.FlexHorizontal
              css={css`
                gap: 0;
              `}
            >
              <S.CustomInput placeholder="" onChange={onChange} name="securityDeposit" value={values.securityDeposit} />
              <S.CustomLabel label=" 만원   " />
              <S.CustomInput placeholder="" onChange={onChange} name="monthlyRent" value={values.monthlyRent} />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>
        <S.FlexHorizontal>
          {makeCustomForm({ label: '계약 기간(년)', values, name: 'durationOfContract', onChange })}
          {makeCustomForm({ label: '층수', values, name: 'numberOfStories', onChange })}
        </S.FlexHorizontal>
        <FormField>
          <FormField.Label label="가까운 교통편" />
          <S.FlexHorizontal
            css={css`
              gap: 0;
            `}
          >
            <S.CustomInput
              placeholder="지하철역"
              onChange={onChange}
              name="nearTransportation"
              value={values.nearTransportation}
            />
            <S.CustomLabel label=" 까지   " />
            <S.CustomInput
              placeholder="분"
              onChange={onChange}
              name="nearTransportationDistance"
              value={values.nearTransportationDistance}
            />
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>
        {makeCustomForm({ label: '부동산 이름', onChange, values, name: 'officeOfRealEstate' })}
        <S.SubmitButton label="가구 옵션 추가하기" size="full" />
      </S.Container>
    </S.ContentWrapper>
  );
};
const makeCustomForm = (res: MakeFormArgs) => (
  <S.CustomFormField key={res.label}>
    <FormField.Label label={res.label} required={res.required} />
    <FormField.Input placeholder="" width="full" onChange={res.onChange} name={res.name} value={res.values[res.name]} />
    <FormField.P value={''} />
  </S.CustomFormField>
);
export interface MakeFormArgs {
  name: InputName;
  values: Record<InputName, string | number>;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: InputChangeEvent) => void;
}
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

export default NewChecklistBasicInfoTemplate;
