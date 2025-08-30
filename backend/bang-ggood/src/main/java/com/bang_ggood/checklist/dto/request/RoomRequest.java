package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.domain.FloorLevel;
import com.bang_ggood.checklist.domain.Structure;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record RoomRequest(@NotBlank(message = "방 이름이 존재하지 않습니다.") String roomName,
                          String address, String buildingName, String station,
                          Integer walkingTime, Integer deposit, Integer rent, Integer maintenanceFee,
                          List<Integer> includedMaintenances, String floorLevel, Integer floor,
                          String structure, Double size, Double latitude, Double longitude, Integer contractTerm,
                          Integer occupancyMonth,
                          String occupancyPeriod,
                          String realEstate, String memo, String summary
) {

    public Room toRoomEntity() {
        return new Room(roomName, address, buildingName, station, walkingTime,
                FloorLevel.from(floorLevel), floor, Structure.from(structure), size, latitude, longitude);
    }
}
