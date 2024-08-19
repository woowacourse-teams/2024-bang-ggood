package com.bang_ggood.station.domain;

public class Station {

    private final Integer id;
    private final String name;
    private final String line;
    private final double latitude;
    private final double longitude;

    public Station(Integer id, String name, String line, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.line = line;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLine() {
        return line;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    @Override
    public String toString() {
        return "Station{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", line='" + line + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
