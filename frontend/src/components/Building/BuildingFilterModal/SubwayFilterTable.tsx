import styled from '@emotion/styled';
import { CSSProperties, useState } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Text from '@/components/_common/Text/Text';
import color from '@/styles/color';

interface SubwayTableProps {
  selectedStations: { region: string; line: string; station: string }[];
  onSelectSubwayStation: (stationNames: { region: string; line: string; station: string }) => void;
}

function SubwayFilterTable({ onSelectSubwayStation, selectedStations }: SubwayTableProps) {
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof subwayMap | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  return (
    <div>
      <FlexBox.Horizontal gap="0">
        <S.Cell bgColor={color.gray[200]} width="33.3%">
          지역
        </S.Cell>
        <S.Cell bgColor={color.gray[200]} width="33.3%">
          호선
        </S.Cell>
        <S.Cell bgColor={color.gray[200]} width="33.3%">
          역명
        </S.Cell>
      </FlexBox.Horizontal>
      <FlexBox.Horizontal gap="0">
        <div style={{ flexDirection: 'column', display: 'flex', width: '33.3%' }}>
          {Object.keys(subwayMap).map(region => {
            const isSelected = selectedRegion === region;
            return (
              <S.Cell key={region} bgColor={isSelected ? undefined : color.gray[200]}>
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region as keyof typeof subwayMap);
                    setSelectedLine(null);
                  }}
                >
                  <Text
                    typography={font => font.body[2].B}
                    color={color => (isSelected ? color.primary[600] : color.mono.black)}
                  >
                    {region}
                  </Text>
                </button>
              </S.Cell>
            );
          })}
        </div>
        {selectedRegion && (
          <FlexBox.Vertical gap="0" width="33.3%">
            {Object.keys(subwayMap[selectedRegion])?.map(line => {
              const isSelected = selectedLine === line;
              return (
                <S.Cell key={line} onClick={() => setSelectedLine(line)}>
                  <Text
                    typography={font => font.body[2].B}
                    color={color => (isSelected ? color.primary[600] : color.mono.black)}
                  >
                    {line}
                  </Text>
                </S.Cell>
              );
            })}
          </FlexBox.Vertical>
        )}
        {selectedRegion && selectedLine && (
          <FlexBox.Vertical gap="0" width="33.3%">
            {subwayMap[selectedRegion][selectedLine].map(station => (
              <S.Cell key={station}>
                <button
                  onClick={() => {
                    onSelectSubwayStation({ region: selectedRegion, line: selectedLine, station });
                  }}
                >
                  <Text
                    typography={font => font.body[2].B}
                    color={color =>
                      selectedStations.some(
                        s => s.station === station && s.region === selectedRegion && s.line === selectedLine,
                      )
                        ? color.primary[600]
                        : color.mono.black
                    }
                  >
                    {station}
                  </Text>
                </button>
              </S.Cell>
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

const S = {
  Cell: styled.div<{ bgColor?: CSSProperties['backgroundColor']; width?: CSSProperties['width'] }>`
    width: ${({ width }) => width};
    padding: 10px 12px;

    background-color: ${({ bgColor }) => bgColor};

    text-align: center;
    vertical-align: middle;
  `,
};
export default SubwayFilterTable;
