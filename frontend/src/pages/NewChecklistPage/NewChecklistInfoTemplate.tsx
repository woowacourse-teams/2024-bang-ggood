import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/common/FormField/FormField';
import Header from '@/components/common/Header/Header';
import { InputChangeEvent } from '@/components/common/Input/Input';
import OptionModal from '@/components/NewChecklist/OptionModal/OptionModal';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';
import { RoomInfo, RoomInfoName } from '@/types/room';

interface Props {
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  roomInfo: RoomInfo;
  onChange: (event: InputChangeEvent) => void;
}
//TODO: 옵션 모달 등 복잡해서 추후 리팩토링 필요
const NewChecklistInfoTemplate = ({
  selectedOptions,
  setSelectedOptions,
  roomInfo,
  onChange: onChangeForForm,
}: Props) => {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const onClickOptionModalOpen = () => setIsOptionModalOpen(true);

  return (
    <S.ContentWrapper>
      <S.Container>
        {/* 방이름 */}
        <CustomFormField label="방 이름" onChange={onChangeForForm} name="name" values={roomInfo} required={true} />
        {/* 주소 */}
        <FormField>
          <S.FlexVertical>
            <FormField.Label label="주소" />
            <S.FlexHorizontal gap={'6%'}>
              <S.CustomInput onChange={onChangeForForm} name="address" value={roomInfo.address} />
              <S.AddressButton> 주소 찾기</S.AddressButton>
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>
        {/* 교통편 */}
        <S.FlexVertical>
          <FormField.Label label="가까운 교통편" />
          <FormField.P value="주소를 추가하면 가까운 역을 찾아드려요!" />
        </S.FlexVertical>
        {/* 보증금 월세 */}
        <FormField>
          <S.FlexVertical>
            <FormField.Label label="보증금 / 월세" />
            <S.FlexHorizontal gap={0}>
              <S.CustomInput placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />
              <S.CustomLabel label=" 만원   " />
              <S.CustomInput placeholder="" onChange={onChangeForForm} name="rent" value={roomInfo.rent} />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>
        {/* 방 종류 */}
        <S.FlexVertical>
          <FormField.Label label="방 종류" />
          <select>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </S.FlexVertical>
        {/* 방 크기 */}
        {/* 층수 */}
        {/* 계약 기간 */}
        <S.FlexHorizontal>
          <CustomFormField label="계약 기간(개월)" values={roomInfo} name="contractTerm" onChange={onChangeForForm} />
          <CustomFormField label="층수" values={roomInfo} name="floor" onChange={onChangeForForm} />
        </S.FlexHorizontal>
        {/* 부동산 이름 */}
        <CustomFormField label="부동산 이름" onChange={onChangeForForm} values={roomInfo} name="realEstate" />

        {/* 가구옵션 */}
        {/* 가구옵션버튼 */}
        <S.AddOptionButton label="가구 옵션 추가하기" size="full" onClick={onClickOptionModalOpen} />
        {/*옵션 선택 모달*/}
        {isOptionModalOpen && (
          <OptionModal
            isOpen={isOptionModalOpen}
            setIsOpen={setIsOptionModalOpen}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}
      </S.Container>
    </S.ContentWrapper>
  );
};

const CustomFormField = ({ label, name, values, required, onChange }: MakeFormArgs) => (
  <S.CustomFormField key={label}>
    <FormField.Label label={label} required={required} />
    <FormField.Input placeholder="" width="full" onChange={onChange} name={name} value={values[name]} />
    <FormField.P value={''} />
  </S.CustomFormField>
);

export interface MakeFormArgs {
  name: RoomInfoName;
  values: RoomInfo;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: InputChangeEvent) => void;
}
const S = {
  ContentWrapper: styled.div`
    padding-top: 40px;

    background-color: white;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    row-gap: 24px;
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
  AddressButton: styled.button`
    background-color: ${({ theme }) => theme.palette.grey300};
  `,
  AddOptionButton: styled(Button)`
    width: 100%;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.palette.yellow500};

    &:hover {
      background-color: ${({ theme }) => theme.palette.yellow600};
    }

    color: black;
  `,
  FlexHorizontal: styled.div<{ gap?: number | string }>`
    ${flexRow}
    justify-content: space-between;
    column-gap: ${({ gap }) => gap ?? '6%'};
    width: 100%;
  `,
  FlexVertical: styled.div<{ gap?: number }>`
    ${flexColumn}
    row-gap: ${({ gap }) => gap ?? '10px'};
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
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  `,
};

export default NewChecklistInfoTemplate;
