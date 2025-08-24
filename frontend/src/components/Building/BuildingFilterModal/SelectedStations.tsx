import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Text from '@/components/_common/Text/Text';

interface SelectedStationsProps {
  selectedStations: { region: string; line: string; station: string }[];
  removeStation: (station: { region: string; line: string; station: string }) => void;
}
function SelectedStations({ selectedStations, removeStation }: SelectedStationsProps) {
  return (
    <div>
      <div>
        선택한 역 <Text color={color => color.primary[600]}>{selectedStations.length}</Text> 최대 5개
      </div>
      <FlexBox.Horizontal>
        {selectedStations.map(station => (
          <div key={station.station} onClick={() => removeStation(station)}>
            {station.station}
          </div>
        ))}
      </FlexBox.Horizontal>
    </div>
  );
}

export default SelectedStations;
