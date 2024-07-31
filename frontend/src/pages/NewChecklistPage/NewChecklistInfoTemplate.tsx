import styled from '@emotion/styled';
import { useState } from 'react';

import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import FormField from '@/components/common/FormField/FormField';
import Header from '@/components/common/Header/Header';
import { InputChangeEvent } from '@/components/common/Input/Input';
import RadioGroup from '@/components/common/RadioGroup/RadioGroup';
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

  const [roomStructure, setRoomStructure] = useState('');
  const onClickOptionModalOpen = () => setIsOptionModalOpen(true);

  return (
    <S.ContentWrapper>
      <S.Container>
        {/* 방이름 */}
        <FormField>
          <FormField.Label label="방 이름" required={true} />
          <FormField.Input placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />
          <FormField.P value="" />
        </FormField>

        {/* 주소 */}
        <FormField>
          <S.FlexVertical>
            <FormField.Label label="주소" />
            <S.FlexHorizontal gap={'3%'}>
              <S.CustomInput onChange={onChangeForForm} name="address" value={roomInfo.address} />
              <S.AddressButton isSquare={true} label="주소찾기" size="medium" color="dark" />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>

        {/* 교통편 */}
        <S.FlexVertical gap="15px">
          <FormField.Label label="가까운 교통편" />
          <FormField.P value="주소를 추가하면 가까운 역을 찾아드려요!" />
        </S.FlexVertical>

        {/* 보증금 월세 */}
        <FormField>
          <FormField.Label label="보증금 / 월세 (만원)" />
          <S.FlexHorizontal gap={0}>
            <S.CustomInput placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />
            <S.CustomLabel label=" / " />
            <S.CustomInput placeholder="" onChange={onChangeForForm} name="rent" value={roomInfo.rent} />
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>

        {/* 방 종류 */}
        <S.FlexVertical>
          <FormField.Label label="방 종류" />
          <S.OptionButtonContainer flexWrap="wrap">
            <Badge label="빌라" type="button" />
            <Badge label="오피스텔" type="button" />
            <Badge label="아파트" type="button" />
            <Badge label="기타" type="button" />
          </S.OptionButtonContainer>
        </S.FlexVertical>

        {/* 방 구조 */}
        <S.FlexVertical>
          <FormField.Label label="방 구조" />
          <S.OptionButtonContainer flexWrap="wrap">
            <Badge label="오픈형 원룸" type="button" />
            <Badge label="분리형 원룸" type="button" />
            <Badge label="투룸" type="button" />
            <Badge label="쓰리룸 이상" type="button" />
            <Badge label="복층" type="button" />
          </S.OptionButtonContainer>
        </S.FlexVertical>

        {/* 방 크기 */}
        <FormField>
          <FormField.Label label="방 크기" />
          <S.FlexHorizontal>
            <S.CustomInput placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />

            <S.RadioGroup
              label=""
              value={roomStructure}
              onChangeChild={e => {
                setRoomStructure(e.target.value);
              }}
            >
              <RadioGroup.RadioButton value="m2" color="green">
                m2
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton value="평" color="green">
                평
              </RadioGroup.RadioButton>
            </S.RadioGroup>
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>

        {/* 층수 */}
        <FormField>
          <FormField.Label label="층수" />
          <S.FlexHorizontal>
            <S.CustomInput placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />

            <S.RadioGroup
              label=""
              value={roomStructure}
              onChangeChild={e => {
                setRoomStructure(e.target.value);
              }}
            >
              <RadioGroup.RadioButton value="지상" color="green">
                지상
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton value="반지하/지하" color="green">
                반지하/지하
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton value="옥탑" color="green">
                옥탑
              </RadioGroup.RadioButton>
            </S.RadioGroup>
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>

        {/* 계약 기간 */}
        <S.FlexHorizontal>
          <CustomFormField label="계약 기간(개월)" values={roomInfo} name="contractTerm" onChange={onChangeForForm} />
        </S.FlexHorizontal>

        {/* 부동산 이름 */}
        <CustomFormField label="부동산 이름" onChange={onChangeForForm} values={roomInfo} name="realEstate" />

        {/* 가구옵션 */}
        <FormField.Label label="가구옵션" />
        <S.FurnitureOptionContent value="TV, 냉장고, 신발, 에어컨" />

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

const CustomFormField = ({ label, name, values, required, onChange }: CustomFormFieldProps) => (
  <S.CustomFormField key={label}>
    <FormField.Label label={label} required={required} />
    <FormField.Input placeholder="" width="full" onChange={onChange} name={name} value={values[name]} />
    <FormField.P value={''} />
  </S.CustomFormField>
);

export interface CustomFormFieldProps {
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
    ${flexColumn}
    padding: 28px 22px;
    justify-content: start;
    row-gap: 28px;
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
  AddressButton: styled(Button)`
    width: 90px;
    height: 30px;
    padding: 5px;

    font-size: ${({ theme }) => theme.text.size.xSmall};
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
  FlexHorizontal: styled.div<{ gap?: number | string; flexWrap?: string }>`
    ${flexRow}
    justify-content: space-between;
    gap: 8px ${({ gap: gap }) => gap ?? '6%'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
  `,
  OptionButtonContainer: styled.div<{ gap?: number | string; flexWrap?: string }>`
    display: flex;
    justify-content: flex-start;
    gap: 4px ${({ gap: gap }) => gap ?? '6%'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
  `,
  FlexVertical: styled.div<{ gap?: string }>`
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
  RadioGroup: styled(RadioGroup)<{ width?: string }>`
    ${({ width }) => (width ? `width:${width};` : '')}
    flex: 1 0 auto;

    ${flexCenter}
    font-size: ${({ theme }) => theme.text.size.xSmall};
    column-gap: 7px;
  `,
  FurnitureOptionContent: styled(FormField.P)`
    color: ${({ theme }) => theme.palette.grey500};
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
};

export default NewChecklistInfoTemplate;
