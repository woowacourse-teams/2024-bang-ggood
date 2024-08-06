package com.bang_ggood.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProfileResponse(String nickname, String thumbnail_image_url, String profile_image_url) {
}
