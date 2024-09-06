package com.bang_ggood.maintenance.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum MaintenanceItem {
    WATERWORKS(1, "수도"),
    INTERNET(2, "인터넷"),
    ELECTRICITY(3, "전기"),
    GAS(4, "가스");

    private final int id;
    private final String name;

    MaintenanceItem(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static boolean contains(int id) {
        return Arrays.stream(MaintenanceItem.values())
                .anyMatch(maintenanceItem -> maintenanceItem.id == id);
    }

    public static MaintenanceItem fromId(int id) {
        for (MaintenanceItem maintenanceItem : values()) {
            if (maintenanceItem.id == id) {
                return maintenanceItem;
            }
        }
        throw new BangggoodException(ExceptionCode.MAINTENANCE_ITEM_INVALID);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
