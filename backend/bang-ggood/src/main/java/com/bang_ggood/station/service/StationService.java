package com.bang_ggood.station.service;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.station.domain.Station;
import com.bang_ggood.station.dto.StationResponse;
import com.bang_ggood.utils.FileReader;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;

@Service
public class StationService {

    private static final int METER_PER_DEGREE = 111_320;
    private static final double AVERAGE_WALKING_SPEED = 1.3 * 60; // meter per minute
    private static final List<Station> stations = FileReader.readStationData();

    public StationResponse readNearestStation(double latitude, double longitude) {
        return stations.stream()
                .map(station -> {
                    double dx = (station.getLatitude() - latitude) * METER_PER_DEGREE;
                    double dy = (station.getLongitude() - longitude) * METER_PER_DEGREE * Math.cos(station.getLatitude());
                    double distance = Math.sqrt(dx * dx + dy * dy);
                    return StationResponse.of(station, (int) Math.round(distance / AVERAGE_WALKING_SPEED));
                })
                .min(Comparator.comparing(StationResponse::walkingTime))
                .orElseThrow(() -> new BangggoodException(ExceptionCode.STATION_NOT_FOUND));
    }
}
