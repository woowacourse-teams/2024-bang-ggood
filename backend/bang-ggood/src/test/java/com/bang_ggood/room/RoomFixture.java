package com.bang_ggood.room;

import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
import com.bang_ggood.room.dto.request.RoomCreateRequest;

public class RoomFixture {

    public static final Room ROOM_1 = new Room(
            "살기 좋은 방", 3, "인천광역시 부평구", "부개", 10,
            Type.APARTMENT, 33, FloorLevel.GROUND, Structure.TWO_ROOM
    );

    public static final Room ROOM_2 = new Room(
            "살기 싫은 방", 4, "대구광역시 중구", "대구", 10,
            Type.OFFICETEL, 44, FloorLevel.BASEMENT, Structure.DIVIDED_ONE_ROOM
    );

    public static final Room ROOM_3 = new Room(
            "살기 애매한 방", 5, "서울특별시 송파구", "잠실", 10,
            Type.VILLA, 55, FloorLevel.ROOFTOP, Structure.DUPLEX
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST = new RoomCreateRequest(
            "방이름", 1000, 50, 12, 3,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사",
            Type.VILLA.getName(), 33, FloorLevel.GROUND.getName(), Structure.TWO_ROOM.getName()
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST_NO_ROOM_NAME = new RoomCreateRequest(
            null, 1000, 50, 12, 3,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사",
            Type.APARTMENT.getName(), 44, FloorLevel.BASEMENT.getName(), Structure.DIVIDED_ONE_ROOM.getName()
    );
}
