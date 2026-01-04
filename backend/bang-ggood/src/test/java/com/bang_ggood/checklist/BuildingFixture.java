package com.bang_ggood.checklist;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.station.domain.BuildingStation;

public class BuildingFixture {
    public static Building BUILDING_1() {
        return new Building(
                "인천광역시 부평구", null, 37.5153, 127.1030
        );
    }

    public static Building BUILDING_1_WITH_OTHER_NAME() {
        return new Building(
                "인천광역시 부평구", "빌딩 이름 추가", 37.5153, 127.1030
        );
    }

    public static Building BUILDING_2() {
        return new Building(
                "대구광역시 중구", "롯데타워", 37.5153, 127.1030
        );
    }

    public static Building BUILDING_3() {
        return new Building(
                "서울특별시 송파구", "루터회관", 37.5153, 127.1030
        );
    }

    public static Building BUILDING_NULL() {
        return new Building(
                null, null, null, null
        );
    }

    public static BuildingImage BUILDING_IMAGE1(Building building) {
        return new BuildingImage(
                building, "testUrl"
        );
    }

    public static BuildingStation BUILDING_Station1(Building building) {
        return new BuildingStation(
                building, "testStation", "testLine", 10
        );
    }
}
