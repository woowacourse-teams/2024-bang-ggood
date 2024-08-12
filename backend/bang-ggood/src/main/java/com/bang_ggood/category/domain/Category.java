package com.bang_ggood.category.domain;

public enum Category {

    ROOM_CONDITION(1, "방 컨디션", "🏠"),
    WINDOW(2, "창문", "🪟"),
    BATHROOM(3, "화장실", "🛀"),
    SECURITY(4, "보안", "🚨"),
    OUTSIDE(5, "외부", "🌇");

    private final int id;
    private final String name;
    private final String emoji;

    Category(int id, String name, String emoji) {
        this.id = id;
        this.name = name;
        this.emoji = emoji;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        String nameWithEmojiPattern = "%s %s";
        return String.format(nameWithEmojiPattern, emoji, name);
    }
}
