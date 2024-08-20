package com.bang_ggood.station.dto;

import com.bang_ggood.station.domain.Station;

public record StationResponse(String stationName, String stationLine, Integer walkingTime) {

    public static StationResponse of(Station station, Integer walkingTime) {
        return new StationResponse(station.getName(), station.getLine(), walkingTime);
    }
}
