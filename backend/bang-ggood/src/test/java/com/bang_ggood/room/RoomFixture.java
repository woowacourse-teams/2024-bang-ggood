package com.bang_ggood.room;

import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
import com.bang_ggood.room.dto.request.RoomCreateRequest;
import com.bang_ggood.room.domain.Room;

public class RoomFixture {

   public static final Room ROOM = new Room(
            "살기 좋은 방", "잠실", 10, "인천광역시 부평구",
            Type.VILLA, 10, 5, FloorLevel.GROUND, Structure.TWO_ROOM
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST = new RoomCreateRequest(
            "방이름", 1000, 50, 12,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사",
            "아파트", "분리형 원룸", 8, 4, "지상"
    );

    public static final RoomCreateRequest ROOM_CREATE_REQUEST_NO_ROOM_NAME = new RoomCreateRequest(
            null, 1000, 50, 12,
            "부산광역시 루터회관", "잠실역", 10, "방끗공인중개사",
            "아파트", "분리형 원룸", 8, 4, "지상"
    );
}
