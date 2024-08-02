package com.bang_ggood.category.domain;

public enum Badge {

    CLEAN(1, "청결", "청결해요", "✨"),
    ROOM_CONDITION(2, "방 컨디션", "방 컨디션이 좋아요", "🏠"),
    AMENITY(3, "편의시설", "편의시설이 많아요", "🚇"),
    OPTION(4, "옵션", "옵션이 많아요", "🛋️"),
    ENVIRONMENT(5, "주거환경", "주거환경이 좋아요", "🌱"),
    SECURITY(6, "보안", "안전해요", "🔒"),
    ECONOMIC(7, "경제적", "경제적이에요", "💰"),
    NONE(8, "", "", "");

    private static final String DESCRIPTION_FORMAT = "%s %s";
    private final Integer id;
    private final String shortName;
    private final String longName;
    private final String emoji;

    Badge(Integer id, String shortName, String longName, String emoji) {
        this.id = id;
        this.shortName = shortName;
        this.longName = longName;
        this.emoji = emoji;
    }

    public Integer getId() {
        return id;
    }

    public String getShortNameWithEmoji() {
        return String.format(DESCRIPTION_FORMAT, this.emoji, this.shortName);
    }

    public String getLongNameWithEmoji() {
        return String.format(DESCRIPTION_FORMAT, this.emoji, this.longName);
    }
}
