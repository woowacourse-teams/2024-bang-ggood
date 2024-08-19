package com.bang_ggood.room.dto.request;

import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
import jakarta.validation.constraints.NotBlank;

public record RoomRequest(@NotBlank(message = "방 이름이 존재하지 않습니다.") String roomName,
                          Integer deposit, Integer rent, Integer contractTerm, String address,
                          String station, Integer walkingTime, String realEstate,
                          String type, String structure, Double size, Integer floor, String floorLevel,
                          Integer occupancyMonth, String occupancyPeriod, String memo, String summary) {

    public Room toRoomEntity() {
        return new Room(roomName, station, walkingTime, address,
                Type.from(type), size, floor, FloorLevel.from(floorLevel), Structure.from(structure));
    }
}
