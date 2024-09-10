package com.bang_ggood.station.dto;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.station.domain.SubwayStation;
import java.util.ArrayList;
import java.util.List;

public class SubwayStationResponse {

    private final String stationName;
    private final List<String> stationLine;
    private Integer walkingTime;

    public SubwayStationResponse(String stationName, List<String> stationLine, Integer walkingTime) {
        this.stationName = stationName;
        this.stationLine = stationLine;
        this.walkingTime = walkingTime;
    }

    public static SubwayStationResponse of(SubwayStation station, Integer walkingTime) {
        List<String> stationLine = new ArrayList<>();
        stationLine.add(station.getLine());
        return new SubwayStationResponse(station.getName(), stationLine, walkingTime);
    }

    public SubwayStationResponse merge(SubwayStationResponse response) {
        if (!stationName.equals(response.stationName)) {
            throw new BangggoodException(ExceptionCode.STATION_NOT_SAME);
        }

        stationLine.addAll(response.stationLine);
        walkingTime = Math.min(walkingTime, response.walkingTime);
        return this;
    }

    public String getStationName() {
        return stationName;
    }

    public List<String> getStationLine() {
        return stationLine;
    }

    public Integer getWalkingTime() {
        return walkingTime;
    }
}
