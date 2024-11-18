package com.bang_ggood.room;

import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.dto.request.RoomRequest;
import java.util.List;

public class RoomFixture {

    public static Room ROOM_1() {
        return new Room(
                "살기 좋은 방", "인천광역시 부평구", null,
                "부개", 10, FloorLevel.GROUND, 3,
                Structure.TWO_ROOM, 3.5, 37.5153, 127.1030
        );
    }

    public static Room ROOM_2() {
        return new Room(
                "살기 싫은 방", "대구광역시 중구", "롯데타워",
                "대구", 10, FloorLevel.BASEMENT, null,
                Structure.DIVIDED_ONE_ROOM, 4.0, 37.5153, 127.1030
        );
    }

    public static Room ROOM_3() {
        return new Room(
                "살기 애매한 방", "서울특별시 송파구", "루터회관",
                "잠실", 5, FloorLevel.ROOFTOP, null,
                Structure.DUPLEX, 5.5, 37.5153, 127.1030
        );
    }

    public static RoomRequest ROOM_CREATE_REQUEST() {
        return new RoomRequest(
                "방이름", "부산광역시 북구", "루터회관", "잠실",
                10, 1000, 50, 5,
                List.of(1, 3), FloorLevel.GROUND.getName(), 10,
                Structure.TWO_ROOM.getName(), 3.3, 37.5153, 127.1030,
                12, OccupancyMonth.APRIL.getMonth(),
                OccupancyPeriod.EARLY.getPeriod(),
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static RoomRequest ROOM_UPDATE_REQUEST() {
        return new RoomRequest(
                "방이름", "부산광역시 루터회관", "잠실역", "루터회관",
                10, 1000, 50, 5,
                List.of(1, 3), FloorLevel.GROUND.getName(), 10,
                Structure.OPEN_ONE_ROOM.getName(), 3.3,
                37.5153, 127.1030 ,
                12, OccupancyMonth.APRIL.getMonth(),
                OccupancyPeriod.EARLY.getPeriod(),
                "방끗공인중개사", "메모추가", "한줄평"
        );
    }

    public static RoomRequest ROOM_CREATE_REQUEST_NO_ROOM_NAME() {
        return new RoomRequest(
                null, "부산광역시 루터회관", "루터회관", "잠실역",
                10, 1000, 50, 5,
                List.of(1, 3), FloorLevel.GROUND.getName(), 10,
                Structure.TWO_ROOM.getName(), 3.3,
                37.5153, 127.1030,
                12, OccupancyMonth.APRIL.getMonth(),
                OccupancyPeriod.EARLY.getPeriod(),
                "방끗공인중개사", "메모", "한줄평"
        );
    }
}
