package com.bang_ggood.checklist.domain;

import java.util.Arrays;

public enum Option {
    AIR_CONDITIONER(1, "에어컨"),
    SINK(2, "싱크대"),
    REFRIGERATOR(3, "냉장고"),
    WASHING_MACHINE(4, "세탁기"),
    MICROWAVE_OVEN(5, "전자레인지"),
    TV(6, "TV"),
    DRYER(7, "건조기"),
    INTERNET(8, "인터넷"),
    GAS_STOVE(9, "가스레인지/인덕션"),
    ELEVATOR(10, "엘리베이터"),
    BED(11, "침대"),
    DESK(12, "책상"),
    CLOSET(13, "옷장"),
    SHOE_RACK(14, "신발장");

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
