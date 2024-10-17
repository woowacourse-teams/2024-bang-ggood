import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import { SubwayStation } from '@/types/subway';

const SubwayStations = ({ stations }: { stations: SubwayStation[] }) => {
  return (
    <FlexBox.Vertical>
      {stations?.length ? (
        stations?.map(station => <SubwayStationItem key={station.stationName} station={station} />)
      ) : (
        <FormField.TextBox text={'보신 방과 가까운 지하철역을 찾아드릴게요.'} />
      )}
    </FlexBox.Vertical>
  );
};

export default SubwayStations;
