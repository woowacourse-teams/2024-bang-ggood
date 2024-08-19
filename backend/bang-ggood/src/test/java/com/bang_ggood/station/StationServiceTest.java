package com.bang_ggood.station;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.service.StationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

public class StationServiceTest extends IntegrationTestSupport {

    @Autowired
    StationService stationService;

    @DisplayName("가까운 지하철 조회 성공")
    @ParameterizedTest
    @MethodSource("provideStationData")
    void readNearestStation(double latitude, double longitude, String nearestStationName) {
        // given & when
        String stationName = stationService.readNearestStation(latitude, longitude).name();

        // then
        assertThat(stationName).isEqualTo(nearestStationName);
    }

    // check data in "https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/"
    private static Stream<Arguments> provideStationData() {
        return Stream.of(
                Arguments.of(37.50495731889611, 126.7550884277559, "상동"),
                Arguments.of(37.48352733443973, 126.80085909322227, "소사"),
                Arguments.of(37.47909015564278, 126.9517354974442, "서울대입구(관악구청)"),
                Arguments.of(37.516248619935034, 127.10303565244502, "잠실(송파구청)")
        );
    }
}
