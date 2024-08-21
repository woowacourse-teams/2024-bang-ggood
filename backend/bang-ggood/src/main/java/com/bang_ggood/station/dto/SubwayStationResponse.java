package com.bang_ggood.station.dto;

import com.bang_ggood.station.domain.SubwayStation;

public record SubwayStationResponse(String stationName, String stationLine, Integer walkingTime) {

    public static SubwayStationResponse of(SubwayStation station, Integer walkingTime) {
        return new SubwayStationResponse(station.getName(), station.getLine(), walkingTime);
    }
}
