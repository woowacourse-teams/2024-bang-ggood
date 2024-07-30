package com.bang_ggood.room.dto.response;

import com.bang_ggood.room.domain.Room;

public record WrittenRoomResponse(String name, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                  String address, String station, Integer walkingTime, String realEstate) {

    public static WrittenRoomResponse of(Room room, Integer deposit, Integer rent,
                                         Integer contractTerm, String realEstate) {
        return new WrittenRoomResponse(room.getName(), deposit, rent, contractTerm, room.getFloor(),
                room.getAddress(), room.getStation(), room.getWalkingTime(), realEstate);
    }
}
