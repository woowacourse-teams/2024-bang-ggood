import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Text from '@/components/_common/Text/Text';

interface SelectedStationsProps {
  selectedStations: string[];
  removeStation: (station: string) => void;
}
function SelectedStations({ selectedStations, removeStation: toggleStation }: SelectedStationsProps) {
  return (
    <div>
      <div>
        선택한 역 <Text color={color => color.primary[600]}>{selectedStations.length}</Text> 최대 5개
      </div>
      <FlexBox.Horizontal>
        {selectedStations.map(station => (
          <div key={station} onClick={() => toggleStation(station)}>
            {station}
          </div>
        ))}
      </FlexBox.Horizontal>
    </div>
  );
}

export default SelectedStations;
