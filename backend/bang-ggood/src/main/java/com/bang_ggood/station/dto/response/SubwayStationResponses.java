package com.bang_ggood.station.dto.response;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class SubwayStationResponses {

    private static final int REQUESTED_STATION_NUMBER = 2;

    private final List<SubwayStationResponse> stations;

    public static SubwayStationResponses from(List<SubwayStationResponse> stations) {
        return new SubwayStationResponses(mergeTransferStations(stations));
    }

    private static List<SubwayStationResponse> mergeTransferStations(List<SubwayStationResponse> stations) {
        return stations.stream()
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

    public SubwayStationResponse getNearestStation() {
        if (stations.isEmpty()) {
            return null;
        }
        return stations.get(0);
    }
}
