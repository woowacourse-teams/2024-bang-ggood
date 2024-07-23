package com.bang_ggood.checklist.domain;

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

    private Integer id;
    private String name;

    Option(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public static boolean contains(Integer id) {
        return Arrays.stream(Option.values())
                .anyMatch(option -> option.id.equals(id));
    }
}
