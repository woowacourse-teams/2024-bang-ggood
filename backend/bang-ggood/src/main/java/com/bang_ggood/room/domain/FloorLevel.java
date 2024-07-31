package com.bang_ggood.room.domain;

public enum FloorLevel {

    GROUND("지상"),
    BASEMENT("반지하/지하"),
    ROOFTOP("옥탑");

    private final String name;

    FloorLevel(String name) {
        this.name = name;
    }
}
