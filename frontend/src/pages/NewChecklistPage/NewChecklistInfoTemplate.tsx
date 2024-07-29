import { css } from '@emotion/react';
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
        {/* 스타일링이 매우 가변적이어서, 불가피하게 유틸함수를 부분적으로 사용 */}
        {makeCustomForm({
          label: '방 이름',
          onChange: onChangeForForm,
          name: 'name',
          values: roomInfo,
          required: true,
        })}
        <FormField>
          <FormField.Label label="보증금 / 월세" />
          <S.FlexVertical>
            <S.FlexHorizontal
              css={css`
                gap: 0;
              `}
            >
              <S.CustomInput placeholder="" onChange={onChangeForForm} name="deposit" value={roomInfo.deposit} />
              <S.CustomLabel label=" 만원   " />
              <S.CustomInput placeholder="" onChange={onChangeForForm} name="rent" value={roomInfo.rent} />
            </S.FlexHorizontal>
            <FormField.P value="" />
          </S.FlexVertical>
        </FormField>
        <S.FlexHorizontal>
          {makeCustomForm({
            label: '계약 기간(년)',
            values: roomInfo,
            name: 'contractTerm',
            onChange: onChangeForForm,
          })}
          {makeCustomForm({ label: '층수', values: roomInfo, name: 'floor', onChange: onChangeForForm })}
        </S.FlexHorizontal>
        <FormField>
          <FormField.Label label="가까운 교통편" />
          <S.FlexHorizontal
            css={css`
              gap: 0;
            `}
          >
            <S.CustomInput placeholder="지하철역" onChange={onChangeForForm} name="station" value={roomInfo.station} />
            <S.CustomLabel label=" 까지   " />
            <S.CustomInput
              placeholder="분"
              onChange={onChangeForForm}
              name="walkingTime"
              value={roomInfo.walkingTime}
            />
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>
        {makeCustomForm({ label: '부동산 이름', onChange: onChangeForForm, values: roomInfo, name: 'realEstate' })}
        <S.SubmitButton label="가구 옵션 추가하기" size="full" onClick={onClickOptionModalOpen} />

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

const makeCustomForm = (res: MakeFormArgs) => (
  <S.CustomFormField key={res.label}>
    <FormField.Label label={res.label} required={res.required} />
    <FormField.Input placeholder="" width="full" onChange={res.onChange} name={res.name} value={res.values[res.name]} />
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
    width: 100%;
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

export default NewChecklistInfoTemplate;
