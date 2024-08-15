package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum Option {

    DOOR_LOCK(1, "도어락"),
    AIR_CONDITIONER(2, "에어컨"),
    REFRIGERATOR(3, "냉장고"),
    SINK(4, "싱크대"),
    GAS_STOVE(5, "가스레인지"),
    MICROWAVE_OVEN(6, "전자레인지"),
    CLOSET(7, "옷장"),
    SHOE_RACK(8, "신발장"),
    WASHING_MACHINE(9, "세탁기"),
    DRYER(10, "건조기"),
    INTERNET(11, "인터넷"),
    BED(12, "침대"),
    DESK(13, "책상"),
    TV(14, "TV"),
    ELEVATOR(15, "엘리베이터");

    private final int id;
    private final String name;

    Option(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static boolean contains(int id) {
        return Arrays.stream(Option.values())
                .anyMatch(option -> option.id == id);
    }

    public static Option fromId(int id) {
        for (Option option : values()) {
            if (option.id == id) {
                return option;
            }
        }
        throw new BangggoodException(ExceptionCode.OPTION_INVALID);
    }

    public String getName() {
        return name;
    }
}
