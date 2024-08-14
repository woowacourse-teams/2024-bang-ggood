import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useStore } from 'zustand';

import Badge from '@/components/_common/Badge/Badge';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import DaumAddressModal from '@/components/NewChecklist/AddressModal/DaumAddressModal';
import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import { roomFloorLevels, roomStructures, roomTypes } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';
import { RoomInfo } from '@/types/room';

const NewChecklistInfoTemplate = () => {
  const { actions, roomInfo, errorMessage } = useStore(checklistRoomInfoStore);

  const handleClickTagButton = useCallback(
    (name: keyof RoomInfo, value: string) => {
      actions.set(name, value);
    },
    [actions],
  );

  const handleSetAddress = (address: string) => {
    actions.set('address', address);
  };

  return (
    <S.ContentWrapper>
      <S.Container>
        {/* 방이름 */}
        <FormField>
          <FormField.Label label="방 이름" required={true} />
          <FormField.Input placeholder="" onChange={actions.onChange} name="roomName" value={roomInfo.roomName} />
          <FormField.ErrorMessage value={errorMessage.roomName ?? ''} />
        </FormField>
        {/* 주소 */}
        <FormField>
          <FormField.Label label="주소" />
          <S.FlexHorizontal gap="3%">
            <S.CustomInput onChange={actions.onChange} name="address" value={roomInfo.address} />
            <DaumAddressModal setAddress={handleSetAddress} />
          </S.FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.address ?? ''} />
        </FormField>
        {/* 교통편 */}
        <S.FlexVertical gap="15px">
          <FormField.Label label="가까운 교통편" />
          {/* TODO: ErrorMessage 로 의도한 건지 확인 필요 */}
          <FormField.ErrorMessage value="주소를 추가하면 가까운 역을 찾아드려요!" />
        </S.FlexVertical>
        {/* 보증금 월세 */}
        <FormField>
          <FormField.Label label="보증금 / 월세 (만원)" />
          <S.FlexHorizontal gap={0}>
            <S.CustomInput onChange={actions.onChange} type="number" name="deposit" value={roomInfo.deposit} />
            <S.CustomLabel label=" / " />
            <S.CustomInput placeholder="" onChange={actions.onChange} type="number" name="rent" value={roomInfo.rent} />
          </S.FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.deposit || errorMessage.rent || ''} />
        </FormField>
        {/* 방 종류 */}
        <S.FlexVertical>
          <FormField.Label label="방 종류" />
          <S.OptionButtonContainer flexWrap="wrap">
            {roomTypes.map(type => (
              <Badge
                key={type}
                label={type}
                size="button"
                isSelected={roomInfo.type === type}
                onClick={() => handleClickTagButton('type', type)}
              />
            ))}
          </S.OptionButtonContainer>
        </S.FlexVertical>
        {/* 방 구조 */}
        <S.FlexVertical>
          <FormField.Label label="방 구조" />
          <S.OptionButtonContainer flexWrap="wrap">
            {roomStructures.map(structure => (
              <Badge
                key={structure}
                label={structure}
                name={structure}
                size="button"
                isSelected={roomInfo.structure === structure}
                onClick={() => handleClickTagButton('structure', structure)}
              />
            ))}
          </S.OptionButtonContainer>
        </S.FlexVertical>
        {/* 방 크기 */}
        <FormField>
          <FormField.Label label="방 크기 (평)" />
          <S.FlexHorizontal>
            <S.CustomInput placeholder="" type="number" onChange={actions.onChange} name="size" value={roomInfo.size} />
          </S.FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.size ?? ''} />
        </FormField>
        {/* 층수 */}
        <FormField>
          <FormField.Label label="층수" />
          <S.FlexHorizontal>
            <S.CustomInput
              placeholder=""
              name="floor"
              type="number"
              value={roomInfo.floor}
              onChange={actions.onChange}
            />
            <S.RadioGroup label="" value={roomInfo.floorLevel ?? ''} onChangeChild={actions.onChange}>
              {roomFloorLevels.map(floorLevel => (
                <RadioGroup.RadioButton key={floorLevel} name="floorLevel" value={floorLevel} color="green">
                  {floorLevel}
                </RadioGroup.RadioButton>
              ))}
            </S.RadioGroup>
          </S.FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.floor ?? ''} />
        </FormField>
        {/* 계약 기간 */}
        <S.FlexHorizontal>
          <NewChecklistFormField
            label="계약 기간 (개월)"
            value={roomInfo.contractTerm}
            name="contractTerm"
            type="number"
            errorMessage={errorMessage.contractTerm}
            onChange={actions.onChange}
          />
        </S.FlexHorizontal>
        {/* 부동산 이름 */}
        <NewChecklistFormField
          label="부동산 이름"
          onChange={actions.onChange}
          value={roomInfo.realEstate}
          errorMessage={errorMessage.realEstate}
          name="realEstate"
        />
      </S.Container>
    </S.ContentWrapper>
  );
};

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
    gap: 4px ${({ gap: gap }) => gap ?? '10px'};
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

  RadioGroup: styled(RadioGroup)<{ width?: string }>`
    ${({ width }) => (width ? `width:${width};` : '')}
    flex: 1 0 auto;

    ${flexCenter}
    font-size: ${({ theme }) => theme.text.size.xSmall};
    column-gap: 7px;
  `,
};

export default NewChecklistInfoTemplate;
