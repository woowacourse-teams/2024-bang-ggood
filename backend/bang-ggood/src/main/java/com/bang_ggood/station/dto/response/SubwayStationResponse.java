package com.bang_ggood.station.dto.response;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.domain.SubwayStation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class SubwayStationResponse {

    private final String stationName;
    private final List<String> stationLine;
    private Integer walkingTime;

    public static SubwayStationResponse of(SubwayStation station, double latitude, double longitude) {
        List<String> stationLine = new ArrayList<>();
        stationLine.add(station.getLine());
        return new SubwayStationResponse(station.getName(), stationLine,
                station.calculateWalkingTime(latitude, longitude));
    }

    public static SubwayStationResponse from(ChecklistStation checklistStation) {
        List<String> stationLine = new ArrayList<>();
        stationLine.add(checklistStation.getStationLine());
        return new SubwayStationResponse(checklistStation.getStationName(), stationLine, checklistStation.getWalkingTime());
    }

    public SubwayStationResponse merge(SubwayStationResponse response) {
        if (!stationName.equals(response.stationName)) {
            throw new BangggoodException(ExceptionCode.STATION_NAME_NOT_SAME);
        }

        stationLine.addAll(response.stationLine);
        walkingTime = Math.min(walkingTime, response.walkingTime);
        return this;
    }
}
