package com.bang_ggood.category.domain;

public enum Badge {

    CLEAN("청결", "청결해요", "✨"),
    ROOM_CONDITION("방 컨디션", "방 컨디션이 좋아요", "🏠"),
    AMENITY("편의시설", "편의시설이 많아요", "🚇"),
    OPTION("옵션", "옵션이 많아요", "🛋️"),
    ENVIRONMENT("주거환경", "주거환경이 좋아요", "🌱"),
    SECURITY("보안", "안전해요", "🔒"),
    ECONOMIC("경제적", "경제적이에요", "💰")
    ;
  
    private static final String DESCRIPTION_FORMAT = "%s %s";
    private final String shortDescription;
    private final String longDescription;
    private final String emoji;

    Badge(String shortDescription, String longDescription, String emoji) {
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.emoji = emoji;
    }

    public String getShortDescriptionWithEmoji() {
        return String.format(DESCRIPTION_FORMAT, this.emoji, this.shortDescription);
    }

    public String getLongDescriptionWithEmoji() {
        return String.format(DESCRIPTION_FORMAT, this.emoji, this.longDescription);
    }
}
