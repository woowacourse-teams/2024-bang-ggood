import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import Badge from '@/components/_common/Badge/Badge';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { InputChangeEvent } from '@/components/_common/Input/Input';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';
import { RoomInfo, RoomInfoName } from '@/types/room';

interface Props {
  roomInfo: RoomInfo;
  onChange: (event: InputChangeEvent) => void;
  onClickTagButton: (name: string, value: string) => void;
  setRoomInfo: Dispatch<SetStateAction<RoomInfo>>;
}
const NewChecklistInfoTemplate = ({ roomInfo, setRoomInfo, onChange: onChangeForForm, onClickTagButton }: Props) => {
  const [roomSizeUnit, setRoomSizeUnit] = useState('');

  const handleClickRoomSizeUnit = useCallback(
    (newRoomSizeUnit: string) => {
      if (roomSizeUnit === newRoomSizeUnit) return;
      setRoomInfo({
        ...roomInfo,
        size: roomSizeUnit === 'm2' ? (roomInfo.size ?? 0) / 3.3 : (roomInfo.size ?? 0) * 3.3,
      });
      setRoomSizeUnit(newRoomSizeUnit);
    },
    [roomSizeUnit, setRoomSizeUnit, roomInfo, setRoomInfo],
  );

  return (
    <S.ContentWrapper>
      <S.Container>
        {/* 방이름 */}
        <FormField>
          <FormField.Label label="방 이름" required={true} />
          <FormField.Input placeholder="" onChange={onChangeForForm} name="roomName" value={roomInfo.roomName} />
          <FormField.P value="" />
        </FormField>
        {/* 주소 */}
        <FormField>
          <S.FlexVertical>
            <FormField.Label label="주소" />
            <S.FlexHorizontal gap="3%">
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
            <S.CustomInput
              placeholder=""
              onChange={onChangeForForm}
              type="number"
              name="deposit"
              value={roomInfo.deposit}
            />
            <S.CustomLabel label=" / " />
            <S.CustomInput placeholder="" onChange={onChangeForForm} type="number" name="rent" value={roomInfo.rent} />
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>
        {/* 방 종류 */}
        <S.FlexVertical>
          <FormField.Label label="방 종류" />
          <S.OptionButtonContainer flexWrap="wrap">
            <Badge
              label="빌라"
              size="button"
              isSelected={roomInfo.type === '빌라'}
              onClick={() => onClickTagButton('type', '빌라')}
            />
            <Badge
              label="오피스텔"
              size="button"
              isSelected={roomInfo.type === '오피스텔'}
              onClick={() => onClickTagButton('type', '오피스텔')}
            />
            <Badge
              label="아파트"
              size="button"
              isSelected={roomInfo.type === '아파트'}
              onClick={() => onClickTagButton('type', '아파트')}
            />
            <Badge
              label="기타"
              size="button"
              isSelected={roomInfo.type === '기타'}
              onClick={() => onClickTagButton('type', '기타')}
            />
          </S.OptionButtonContainer>
        </S.FlexVertical>
        {/* 방 구조 */}
        <S.FlexVertical>
          <FormField.Label label="방 구조" />
          <S.OptionButtonContainer flexWrap="wrap">
            <Badge
              label="오픈형 원룸"
              name="분리형 원룸"
              size="button"
              isSelected={roomInfo.structure === '빌라'}
              onClick={() => onClickTagButton('structure', '빌라')}
            />
            <Badge
              label="분리형 원룸"
              name="structure"
              size="button"
              isSelected={roomInfo.structure === '분리형 원룸'}
              onClick={() => onClickTagButton('structure', '분리형 원룸')}
            />
            <Badge
              label="투룸"
              size="button"
              isSelected={roomInfo.structure === '투룸'}
              onClick={() => onClickTagButton('structure', '투룸')}
            />
            <Badge
              label="쓰리룸 이상"
              size="button"
              isSelected={roomInfo.structure === '쓰리룸 이상'}
              onClick={() => onClickTagButton('structure', '쓰리룸 이상')}
            />
            <Badge
              label="복층"
              size="button"
              isSelected={roomInfo.structure === '복층'}
              onClick={() => onClickTagButton('structure', '복층')}
            />
          </S.OptionButtonContainer>
        </S.FlexVertical>
        {/* 방 크기 */}
        <FormField>
          <FormField.Label label="방 크기" />
          <S.FlexHorizontal>
            <S.CustomInput placeholder="" onChange={onChangeForForm} name="size" value={roomInfo.size} />

            <S.RadioGroup label="" value={roomSizeUnit} onChangeChild={() => {}}>
              <RadioGroup.RadioButton value="m2" color="green" onClick={() => handleClickRoomSizeUnit('m2')}>
                m2
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton value="평" color="green" onClick={() => handleClickRoomSizeUnit('평')}>
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
            <S.CustomInput placeholder="" name="floor" value={roomInfo.floor} onChange={onChangeForForm} />

            <S.RadioGroup label="" value={roomInfo.floorLevel ?? ''} onChangeChild={onChangeForForm}>
              <RadioGroup.RadioButton name="floorLevel" value="지상" color="green">
                지상
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton name="floorLevel" value="반지하/지하" color="green">
                반지하/지하
              </RadioGroup.RadioButton>
              <RadioGroup.RadioButton name="floorLevel" value="옥탑" color="green">
                옥탑
              </RadioGroup.RadioButton>
            </S.RadioGroup>
          </S.FlexHorizontal>
          <FormField.P value="" />
        </FormField>
        {/* 계약 기간 */}
        <S.FlexHorizontal>
          <CustomFormField
            label="계약 기간(개월)"
            values={roomInfo}
            name="contractTerm"
            type="number"
            onChange={onChangeForForm}
          />
        </S.FlexHorizontal>
        {/* 부동산 이름 */}
        <CustomFormField label="부동산 이름" onChange={onChangeForForm} values={roomInfo} name="realEstate" />
      </S.Container>
    </S.ContentWrapper>
  );
};

const CustomFormField = ({ label, name, values, required, type = 'string', onChange }: CustomFormFieldProps) => (
  <S.CustomFormField key={label}>
    <FormField.Label label={label} required={required} />
    <FormField.Input placeholder="" width="full" type={type} onChange={onChange} name={name} value={values[name]} />
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
  type?: string;
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
  // FurnitureOptionContent: styled(FormField.P)`
  //   color: ${({ theme }) => theme.palette.grey500};
  //   font-weight: ${({ theme }) => theme.text.weight.semiBold};
  // `,
};

export default NewChecklistInfoTemplate;
