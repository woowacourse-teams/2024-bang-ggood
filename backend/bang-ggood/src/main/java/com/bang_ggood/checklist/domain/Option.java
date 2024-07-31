package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;

import java.util.Arrays;

public enum Option {

    AIR_CONDITIONER(1, "에어컨"),
    REFRIGERATOR(2, "냉장고"),
    MICROWAVE_OVEN(3, "전자레인지"),
    WASHING_MACHINE(4, "세탁기"),
    SINK(5, "싱크대"),
    GAS_STOVE(6, "가스레인지/인덕션"),
    INTERNET(7, "인터넷"),
    BED(8, "침대"),
    DESK(9, "책상"),
    CLOSET(10, "옷장"),
    SHOE_RACK(11, "신발장"),
    ELEVATOR(12, "엘리베이터"),
    DRYER(13, "건조기"),
    TV(14, "TV");

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
        throw new BangggoodException(ExceptionCode.INVALID_OPTION);
    }

    public String getName() {
        return name;
    }
}
