package com.bang_ggood.option.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum Option {

    REFRIGERATOR(1, "냉장고"),
    SINK(2, "싱크대"),
    INDUCTION(3, "인덕션"),
    MICROWAVE_OVEN(4, "전자레인지"),
    AIR_CONDITIONER(5, "에어컨"),
    WASHING_MACHINE(6, "세탁기"),
    CLOSET(7, "옷장"),
    DESK(8, "책상"),
    BED(9, "침대"),
    SHOE_RACK(10, "신발장"),
    ELEVATOR(11, "엘리베이터");

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

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
