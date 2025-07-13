import styled from '@emotion/styled';

import Dropdown from '@/components/_common/Dropdown/Dropdown';
import Header from '@/components/_common/Header/Header';
import Input from '@/components/_common/Input/Input';
import Text from '@/components/_common/Text/Text';
import { useGetBuildingListQuery } from '@/hooks/query/useGetBuildingListQuery';
import theme from '@/styles/theme';

const count = 125;
function BuildingListPage() {
  const { data: buildings, isPending, isError } = useGetBuildingListQuery();

  return (
    <>
      <Header center="건물리스트" />
      <S.Row>
        <Input value="" placeholder="건물명, 위치" />
      </S.Row>
      <S.Row>
        <Text color={color => color.gray[600]} typography={theme => theme.body[1].B}>
          <Dropdown
            initialValue="지하철"
            options={[
              {
                value: '지하철',
              },
            ]}
            onSelectSetter={() => {}}
          />
        </Text>
        {!isError && !isPending && (
          <>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].R}>
              전체{' '}
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B}>
              {count}개
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B}>
              최신순
            </Text>
          </>
        )}
      </S.Row>
      <S.Row>{buildings?.totalElements}</S.Row>
      <S.Splitter />
    </>
  );
}

const S = {
  Row: styled.div`
    padding: 1.6rem;
  `,
  Splitter: styled.div`
    width: 100%;
    height: 0.1rem;
    border: 1px solid ${theme.color.gray[200]};
  `,
};

export default BuildingListPage;
