import { useState } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Text from '@/components/_common/Text/Text';

interface SubwayTableProps {
  selectedStations: string[];
  onSelectSubwayStation: (stationNames: string) => void;
}

function SubwayFilterTable({ onSelectSubwayStation, selectedStations }: SubwayTableProps) {
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof subwayMap | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  return (
    <div>
      <FlexBox.Horizontal>
        <div>지역</div>
        <div>호선</div>
        <div>역명</div>
      </FlexBox.Horizontal>
      <FlexBox.Horizontal>
        <div style={{ flexDirection: 'column', display: 'flex' }}>
          {Object.keys(subwayMap).map(region => (
            <button key={region} onClick={() => setSelectedRegion(region as keyof typeof subwayMap)}>
              <Text
                typography={font => font.body[2].B}
                color={color => (selectedRegion === region ? color.primary[600] : color.mono.black)}
              >
                {region}
              </Text>
            </button>
          ))}
        </div>
        {selectedRegion && (
          <FlexBox.Vertical>
            {Object.entries(subwayMap[selectedRegion])?.map(([line, stations]) => (
              <div key={line} onClick={() => setSelectedLine(line)}>
                <Text
                  typography={font => font.body[2].B}
                  color={color => (selectedLine === line ? color.primary[600] : color.mono.black)}
                >
                  {line}
                </Text>
              </div>
            ))}
          </FlexBox.Vertical>
        )}
        {selectedRegion && selectedLine && (
          <FlexBox.Vertical>
            {subwayMap[selectedRegion][selectedLine].map(station => (
              <button
                key={station}
                onClick={() => {
                  // const newStations = selectedStations?.includes(station)
                  //   ? selectedStations.filter(s => s !== station)
                  //   : [...selectedStations, station];
                  // setSelectedStation(newStations);
                  onSelectSubwayStation(station);
                }}
              >
                <Text
                  typography={font => font.body[2].B}
                  color={color => (selectedStations.includes(station) ? color.primary[600] : color.mono.black)}
                >
                  {station}
                </Text>
              </button>
            ))}
          </FlexBox.Vertical>
        )}
      </FlexBox.Horizontal>
    </div>
  );
}

const subwayMap: Record<string, Record<string, string[]>> = {
  서울: {
    '1호선': ['서울역', '시청', '종각', '동대문'],
    '2호선': ['시청', '을지로입구', '강남', '잠실'],
    '3호선': ['경복궁', '안국', '압구정', '고속터미널'],
    '4호선': ['서울역', '명동', '혜화', '이촌'],
  },
  경기: {
    '1호선': ['수원역', '성균관대', '병점', '오산역'],
    '3호선': ['대화', '주엽', '정발산', '마두'],
    '4호선': ['산본', '금정', '중앙', '오이도'],
    '5호선': ['하남풍산', '하남시청', '하남검단산'],
    '8호선': ['모란', '수진', '산성'],
  },
  인천: {
    '1호선': ['동인천', '주안', '부평', '인천'],
    '7호선': ['석남', '산곡', '부평구청'],
  },
};
export default SubwayFilterTable;
