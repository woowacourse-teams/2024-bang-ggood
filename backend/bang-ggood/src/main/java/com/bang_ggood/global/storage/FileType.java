package com.bang_ggood.global.storage;

public enum FileType {

    JPG(".jpg");

    private final String name;

    FileType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
