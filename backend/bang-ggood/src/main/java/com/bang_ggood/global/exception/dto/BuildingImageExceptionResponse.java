package com.bang_ggood.global.exception.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record BuildingImageExceptionResponse(ErrorInfo error) implements ExternalAPIExceptionResponse{

    @Override
    public String toString() {
        return "BuildingImageExceptionResponse{" +
                "error=" + (error != null ? error.toString() : "null") +
                '}';
    }

    public record ErrorInfo(
            int code,
            String message,
            String status,
            List<Detail> details
    ) {
        @Override
        public String toString() {
            return "ErrorInfo{" +
                    "code=" + code +
                    ", message='" + message + '\'' +
                    ", status='" + status + '\'' +
                    ", details=" + (details != null ?
                    details.stream().map(Detail::toString).collect(Collectors.toList()) : "null") +
                    '}';
        }
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
        @Override
        public String toString() {
            return "Detail{" +
                    "type='" + type + '\'' +
                    ", reason='" + reason + '\'' +
                    ", domain='" + domain + '\'' +
                    ", metadata=" + (metadata != null ? metadata.toString() : "null") +
                    ", locale='" + locale + '\'' +
                    ", message='" + message + '\'' +
                    '}';
        }
    }
}
