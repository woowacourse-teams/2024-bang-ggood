package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.FloorLevel;
import com.bang_ggood.checklist.domain.Structure;
import com.bang_ggood.checklist.dto.request.RoomRequest;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import java.util.List;

public class RoomFixture {

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

    public static RoomRequest ROOM_CREATE_REQUEST_EMPTY_LOCATION() {
        return new RoomRequest(
                "방이름", null, null, "잠실",
                null, 1000, 50, 5,
                List.of(1, 3), FloorLevel.GROUND.getName(), 10,
                Structure.TWO_ROOM.getName(), 3.3, null, null,
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
                37.5153, 127.1030,
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
