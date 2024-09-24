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

    private static final int MAX_NESTING_STATION_NUMBER = 4;
    private static final int REQUESTED_STATION_NUMBER = 2;
    private static final List<SubwayStation> SUBWAY_STATIONS = SubwayReader.readSubwayStationData();

    public List<SubwayStationResponse> readNearestStation(double latitude, double longitude) {
        List<SubwayStationResponse> likelyNearStations = findLikelyNearStations(latitude, longitude);
        List<SubwayStationResponse> mergedNearStations = mergeTransferStations(likelyNearStations);

        return mergedNearStations.stream()
                .sorted(Comparator.comparing(SubwayStationResponse::getWalkingTime))
                .limit(REQUESTED_STATION_NUMBER)
                .toList();
    }

    private List<SubwayStationResponse> findLikelyNearStations(double latitude, double longitude) {
        return SUBWAY_STATIONS.stream()
                .map(station -> SubwayStationResponse.of(station, latitude, longitude))
                .sorted(Comparator.comparing(SubwayStationResponse::getWalkingTime))
                .limit(MAX_NESTING_STATION_NUMBER * REQUESTED_STATION_NUMBER)
                .toList();
    }

    private List<SubwayStationResponse> mergeTransferStations(List<SubwayStationResponse> stations) {
        return stations.stream()
                .collect(Collectors.groupingBy(
                        SubwayStationResponse::getStationName,
                        Collectors.reducing(SubwayStationResponse::merge)
                ))
                .values()
                .stream()
                .map(optional -> optional.orElseThrow(() -> new BangggoodException(ExceptionCode.STATION_NOT_FOUND)))
                .toList();
    }


}
