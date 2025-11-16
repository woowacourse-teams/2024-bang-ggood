import { CloseIcon } from '@/assets/assets';
import Badge from '@/components/_common/Badge/Badge';
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
        선택한 역 <Text color={color => color.primary[600]}>{selectedStations.length}</Text>
        <Text color={color => color.gray[500]}> 최대 5개</Text>
      </div>
      <FlexBox.Horizontal margin="1rem 0 0">
        {selectedStations.map(station => (
          <div key={station.station} onClick={() => removeStation(station)}>
            {/* 끄는 기능만 있는 버튼이라, 항상 선택된 상태로 표시 */}

            <Badge
              label={
                <FlexBox.Horizontal gap="0.4rem" align="center" justify="center">
                  <Text style={{ lineHeight: 1 }}>{station.station}</Text>
                  <CloseIcon width={16} height={16} style={{ verticalAlign: 'baseline' }} />
                </FlexBox.Horizontal>
              }
              isSelected={true}
            />
          </div>
        ))}
      </FlexBox.Horizontal>
    </div>
  );
}

export default SelectedStations;
