package com.bang_ggood.room;

import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
import com.bang_ggood.room.dto.request.RoomRequest;

public class RoomFixture {

    public static final Room ROOM_1 = new Room(
            "살기 좋은 방", "부개역", 10, "인천광역시 부평구",
            Type.APARTMENT, 33, 3, FloorLevel.GROUND, Structure.TWO_ROOM
    );

    public static final Room ROOM_2 = new Room(
            "살기 싫은 방", "대구역", 10, "대구광역시 중구",
            Type.OFFICETEL, 44, null, FloorLevel.BASEMENT, Structure.DIVIDED_ONE_ROOM
    );

    public static final Room ROOM_3 = new Room(
            "살기 애매한 방", "잠실역", 5, "서울특별시 송파구",
            Type.VILLA, 55, null, FloorLevel.ROOFTOP, Structure.DUPLEX
    );

    public static final RoomRequest ROOM_CREATE_REQUEST = new RoomRequest(
            "방이름", 1000, 50, 12, "부산광역시 루터회관",
            "잠실역", 10, "방끗공인중개사", Type.VILLA.getName(),
            Structure.TWO_ROOM.getName(), 33, 3, FloorLevel.GROUND.getName()
    );

    public static final RoomRequest ROOM_UPDATE_REQUEST = new RoomRequest(
            "방이름", 1000, 50, 12, "부산광역시 루터회관",
            "잠실역", 10, "방끗공인중개사", Type.VILLA.getName(),
            Structure.OPEN_ONE_ROOM.getName(), 33, 3, FloorLevel.GROUND.getName()
    );

    public static final RoomRequest ROOM_CREATE_REQUEST_NO_ROOM_NAME = new RoomRequest(
            null, 1000, 50, 12, "부산광역시 루터회관",
            "잠실역", 10, "방끗공인중개사", Type.VILLA.getName(),
            Structure.TWO_ROOM.getName(), 33, 3, FloorLevel.GROUND.getName()
    );
}
