import { SubwayStation } from '@/types/subway';

const NearSubwayStationItem = (station: SubwayStation) => {
  const { name, line, walkingTime } = station;

  return <div>NearSubwayStation</div>;
};

export default NearSubwayStationItem;
