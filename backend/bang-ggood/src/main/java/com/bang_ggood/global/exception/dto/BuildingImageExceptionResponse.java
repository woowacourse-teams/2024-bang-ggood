package com.bang_ggood.global.exception.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public record BuildingImageExceptionResponse(ErrorInfo error) implements ExternalAPIExceptionResponse{

    public record ErrorInfo(
            int code,
            String message,
            String status,
            List<Detail> details
    ) {
    }

    public record Detail(
            @JsonProperty("@type")
            String type,
            String reason,
            String domain,
            Map<String, String> metadata,
            String locale,
            String message
    ) {
    }
}
