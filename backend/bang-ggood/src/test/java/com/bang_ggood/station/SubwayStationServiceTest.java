package com.bang_ggood.station;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.dto.SubwayStationResponse;
import com.bang_ggood.station.service.SubwayStationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

public class SubwayStationServiceTest extends IntegrationTestSupport {

    @Autowired
    SubwayStationService subwayStationService;

    // check data in "https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/"
    private static Stream<Arguments> provideStationData() {
        return Stream.of(
                Arguments.of(37.517406150696104, 127.10333134512422,
                        new Station("잠실(송파구청)", List.of("2호선", "8호선")),
                        new Station("잠실나루", List.of("2호선"))),
                Arguments.of(37.50808977595056, 127.04649615866747,
                        new Station("선정릉", List.of("9호선", "수인분당선")),
                        new Station("선릉", List.of("2호선", "수인분당선"))),
                Arguments.of(37.538999998345446, 126.97201837726666,
                        new Station("남영", List.of("1호선")),
                        new Station("삼각지", List.of("4호선", "6호선")))
        );
    }

    @DisplayName("가까운 지하철 2개 조회 성공")
    @ParameterizedTest
    @MethodSource("provideStationData")
    void readNearestStation(double latitude, double longitude, Station nearestStation, Station nextNearestStation) {
        // given & when
        List<SubwayStationResponse> responses = subwayStationService.readNearestStation(latitude, longitude);
        assertThat(responses).hasSize(2);
        SubwayStationResponse nearest = responses.get(0);
        SubwayStationResponse nextNearest = responses.get(1);

        // then
        assertAll(() -> {
                    assertThat(nearest.getStationName()).isEqualTo(nearestStation.name);
                    assertThat(nearest.getStationLine()).containsAll(nearestStation.lines);
                    assertThat(nextNearest.getStationName()).isEqualTo(nextNearestStation.name);
                    assertThat(nextNearest.getStationLine()).containsAll(nextNearestStation.lines);
                }
        );
    }

    private static class Station {
        String name;
        List<String> lines;

        public Station(String name, List<String> lines) {
            this.name = name;
            this.lines = lines;
        }
    }
}
