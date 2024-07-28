package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.domain.Badge;

public record BadgeResponse(String shortName, String longName) {

    public static BadgeResponse from(Badge badge) {
        return new BadgeResponse(badge.getShortNameWithEmoji(), badge.getLongNameWithEmoji());
    }
}
