package com.bang_ggood.user.dto;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import java.time.LocalDateTime;

public record UserResponse(Long userId, String userName, String userEmail,
                           LocalDateTime createdAt, UserType userType) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(), user.getName(), user.getEmail().getValue(),
                user.getCreatedAt(), user.getUserType()
        );
    }
}
