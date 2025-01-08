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
    private static final int MAX_WALKING_TIME = 30;

    public SubwayStationResponses readNearestStation(double latitude, double longitude) {
        List<SubwayStationResponse> stationResponses = SUBWAY_STATIONS.stream()
                .map(station -> SubwayStationResponse.of(station, latitude, longitude))
                .filter(response -> response.getWalkingTime() < MAX_WALKING_TIME)
                .toList();

        return SubwayStationResponses.from(stationResponses);
    }
}
