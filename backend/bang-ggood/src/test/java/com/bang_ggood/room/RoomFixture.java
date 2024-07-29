package com.bang_ggood.room;

import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.RoomCreateRequest;

public class RoomFixture {

    public static final Room ROOM = new Room(
            "살기 좋은 방", 3, "인천광역시 부평구", "잠실", 10
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST = new RoomCreateRequest(
            "방이름", 1000, 50, 12, 3,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사"
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST_NO_ROOM_NAME = new RoomCreateRequest(
            null, 1000, 50, 12, 3,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사"
    );
}
