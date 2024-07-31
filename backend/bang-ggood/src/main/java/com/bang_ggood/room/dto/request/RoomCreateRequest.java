package com.bang_ggood.room.dto.request;

import com.bang_ggood.room.domain.Room;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomCreateRequest(@NotBlank(message = "방 이름이 존재하지 않습니다.") String roomName,
                                Integer deposit, Integer rent, Integer contractTerm, String address,
                                String station, Integer walkingTime, String realEstate,
                                String type, String structure, Integer size, Integer floor, String floorLevel) {

    public Room toRoomEntity() {
        return new Room(roomName, floor, address, station, walkingTime);
    }
}
