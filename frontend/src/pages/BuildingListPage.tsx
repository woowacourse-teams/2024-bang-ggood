import styled from '@emotion/styled';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { MapLogoIcon } from '@/assets/assets';
import SearchIcon from '@/assets/icons/map/SearchIcon';
import Dropdown from '@/components/_common/Dropdown/Dropdown';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Input from '@/components/_common/Input/Input';
import Text from '@/components/_common/Text/Text';
import BuildingCard from '@/components/Building/BuildingCard';
import { ROUTE_PATH } from '@/constants/routePath';
import { useGetBuildingListQuery } from '@/hooks/query/useGetBuildingListQuery';
import theme from '@/styles/theme';

const count = 125;
function BuildingListPage() {
  const { data: buildings, isPending, isError } = useGetBuildingListQuery();

  return (
    <>
      <Header center="건물리스트" />
      <S.Row>
        <div style={{ position: 'relative' }}>
          <Input value="" placeholder="건물명, 위치" />
          <SearchIcon
            onClick={() => {}}
            stroke={theme.color.gray[400]}
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      </S.Row>
      <S.Splitter />
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
          <FlexBox.Horizontal gap="0" margin="1rem 0 0">
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].R}>
              전체
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B} style={{ marginLeft: '1rem' }}>
              {count}개
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B} style={{ marginLeft: 'auto' }}>
              최신순
            </Text>
          </FlexBox.Horizontal>
        )}
      </S.Row>
      <S.Row>
        <FlexBox.Vertical gap="1.6rem">
          {!isError &&
            !isPending &&
            buildings.buildings.map((building, idx) => (
              <Fragment key={building.buildingId}>
                <BuildingCard {...building} />
                {idx !== buildings.buildings.length - 1 && <S.Splitter />}
              </Fragment>
            ))}
        </FlexBox.Vertical>
      </S.Row>
      <S.Splitter />
      <Link to={`${ROUTE_PATH.buildingMap}`}>
        <FloatingButton onClick={() => {}} position="center" size="extends">
          <MapLogoIcon />
          지도
        </FloatingButton>
      </Link>
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
  SearchIcon: styled(SearchIcon)`
    position: fixed;
  `,
};

export default BuildingListPage;
