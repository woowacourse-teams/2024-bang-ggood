package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Building;

public class BuildingFixture {
    public static Building BUILDING_1() {
        return new Building(
                "인천광역시 부평구", null,
                10, 37.5153, 127.1030
        );
    }

    public static Building BUILDING_2() {
        return new Building(
                "대구광역시 중구", "롯데타워",
                10,  37.5153, 127.1030
        );
    }

    public static Building BUILDING_3() {
        return new Building(
                "서울특별시 송파구", "루터회관",
                5, 37.5153, 127.1030
        );
    }

    public static Building BUILDING_NULL() {
        return new Building(
                null, null,
                null, null, null
        );
    }
}
