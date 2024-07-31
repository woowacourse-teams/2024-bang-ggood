package com.bang_ggood.room.dto.request;

import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
import jakarta.validation.constraints.NotNull;

public record RoomCreateRequest(@NotNull(message = "방 이름이 존재하지 않습니다.") String name,
                                Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                String address, String station, Integer walkingTime, String realEstate,
                                String type, Integer size, String floorLevel, String structure) {

    public Room toRoomEntity() {
        return new Room(
                name, floor, address, station, walkingTime,
                Type.fromName(type), size, FloorLevel.fromName(floorLevel), Structure.fromName(structure)
        );
    }
}
