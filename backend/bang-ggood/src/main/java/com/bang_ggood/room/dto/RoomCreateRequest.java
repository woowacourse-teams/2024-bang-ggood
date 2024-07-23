package com.bang_ggood.room.dto;

import com.bang_ggood.room.domain.Room;
import jakarta.validation.constraints.NotNull;

public record RoomCreateRequest(@NotNull(message = "방 이름이 존재하지 않습니다.") String name,
                                Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                String address, String station, Integer walkingTime, String realEstate) {

    public Room toRoomEntity() {
        return new Room(name, floor, address, station, walkingTime);
    }
}
