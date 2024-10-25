package com.bang_ggood.station.dto.request;

public record ChecklistStationRequest(double latitude, double longitude) {

    public static ChecklistStationRequest of(double latitude, double longitude) {
        return new ChecklistStationRequest(latitude, longitude);
    }
}
