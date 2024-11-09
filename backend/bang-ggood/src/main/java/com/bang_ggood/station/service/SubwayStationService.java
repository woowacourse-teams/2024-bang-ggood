package com.bang_ggood.station.service;

import com.bang_ggood.station.SubwayReader;
import com.bang_ggood.station.domain.SubwayStation;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubwayStationService {

    private static final List<SubwayStation> SUBWAY_STATIONS = SubwayReader.readSubwayStationData();

    public SubwayStationResponses readNearestStation(double latitude, double longitude) {
        List<SubwayStationResponse> stationResponses = SUBWAY_STATIONS.stream()
                .map(station -> SubwayStationResponse.of(station, latitude, longitude))
                .toList();

        return SubwayStationResponses.from(stationResponses);
    }
}
