package com.bang_ggood.station.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.station.SubwayReader;
import com.bang_ggood.station.domain.SubwayStation;
import com.bang_ggood.station.dto.SubwayStationResponse;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubwayStationService {

    private static final int METER_PER_DEGREE = 111_320;
    // meter per second * minute unit * decreasing speed on open street
    private static final double AVERAGE_WALKING_SPEED = 1.3 * 60 * 0.4;
    private static final int MAX_NESTING_STATION_NUMBER = 4;
    private static final int REQUESTED_STATION_NUMBER = 2;
    private static final List<SubwayStation> SUBWAY_STATIONS = SubwayReader.readSubwayStationData();

    public List<SubwayStationResponse> readNearestStation(double latitude, double longitude) {
        return SUBWAY_STATIONS.stream()
                .map(station -> {
                    double dx = (station.getLatitude() - latitude) * METER_PER_DEGREE;
                    double dy =
                            (station.getLongitude() - longitude) * METER_PER_DEGREE * Math.cos(station.getLatitude());
                    double distance = Math.sqrt(dx * dx + dy * dy);
                    return SubwayStationResponse.of(station, (int) Math.round(distance / AVERAGE_WALKING_SPEED));
                })
                .sorted(Comparator.comparing(SubwayStationResponse::getWalkingTime))
                .limit(MAX_NESTING_STATION_NUMBER * REQUESTED_STATION_NUMBER)
                .collect(Collectors.groupingBy(
                        SubwayStationResponse::getStationName,
                        Collectors.reducing(SubwayStationResponse::merge)
                ))
                .values()
                .stream()
                .map(optional -> optional.orElseThrow(() -> new BangggoodException(ExceptionCode.STATION_NOT_FOUND)))
                .sorted(Comparator.comparing(SubwayStationResponse::getWalkingTime))
                .limit(REQUESTED_STATION_NUMBER)
                .toList();
    }
}
