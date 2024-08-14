import styled from '@emotion/styled';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import { NewChecklistFormField } from '@/components/NewChecklist/NewChecklistFormField';
import Address from '@/components/NewChecklist/NewRoomInfoForm/Address';
import DepositAndRent from '@/components/NewChecklist/NewRoomInfoForm/DepositAndRent';
import NearTransportation from '@/components/NewChecklist/NewRoomInfoForm/NearTransportation';
import RoomName from '@/components/NewChecklist/NewRoomInfoForm/RoomName';
import RoomStructure from '@/components/NewChecklist/NewRoomInfoForm/RoomStructure';
import RoomType from '@/components/NewChecklist/NewRoomInfoForm/RoomType';
import { roomFloorLevels } from '@/constants/roomInfo';
import checklistRoomInfoStore from '@/store/checklistRoomInfoStore';
import { flexCenter, flexColumn } from '@/styles/common';
import { FlexHorizontal } from '@/styles/styled';

const NewChecklistInfoTemplate = () => {
  const { actions, rawValue: roomInfo, errorMessage } = useStore(checklistRoomInfoStore);

  return (
    <S.ContentWrapper>
      <S.Container>
        <RoomName />
        <Address />
        <NearTransportation />
        <DepositAndRent />
        <RoomType />
        <RoomStructure />
        {/* 방 크기 */}
        <FormField>
          <FormField.Label label="방 크기" />
          <FlexHorizontal>
            <S.CustomInput placeholder="" onChange={actions.onChange} name="size" value={roomInfo.size} />
            <S.CustomLabel label="평"></S.CustomLabel>
          </FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.size ?? ''} />
        </FormField>
        {/* 층수 */}
        <FormField>
          <FormField.Label label="층수" />
          <FlexHorizontal>
            <S.CustomInput placeholder="" name="floor" value={roomInfo.floor} onChange={actions.onChange} />
            <S.RadioGroup label="" value={roomInfo.floorLevel ?? ''} onChangeChild={actions.onChange}>
              {roomFloorLevels.map(floorLevel => (
                <RadioGroup.RadioButton key={floorLevel} name="floorLevel" value={floorLevel} color="green">
                  {floorLevel}
                </RadioGroup.RadioButton>
              ))}
            </S.RadioGroup>
          </FlexHorizontal>
          <FormField.ErrorMessage value={errorMessage.floor ?? ''} />
        </FormField>
        {/* 계약 기간 */}
        <FlexHorizontal>
          <NewChecklistFormField
            label="계약 기간 (개월)"
            value={roomInfo.contractTerm}
            name="contractTerm"
            errorMessage={errorMessage.contractTerm}
            onChange={actions.onChange}
          />
        </FlexHorizontal>
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
    margin-bottom: 20px;
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

  OptionButtonContainer: styled.div<{ gap?: number | string; flexWrap?: string }>`
    display: flex;
    justify-content: flex-start;
    gap: 4px ${({ gap: gap }) => gap ?? '10px'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
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
