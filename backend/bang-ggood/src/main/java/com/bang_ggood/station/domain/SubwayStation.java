package com.bang_ggood.station.domain;

public class SubwayStation {

    private static final int METER_PER_DEGREE = 111_320;
    // meter per second * minute unit * decreasing speed on open street
    private static final double AVERAGE_WALKING_SPEED = 1.3 * 60 * 0.4;

    private final Integer id;
    private final String name;
    private final String line;
    private final double latitude;
    private final double longitude;

    public SubwayStation(Integer id, String name, String line, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.line = line;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int calculateWalkingTime(double latitude, double longitude) {
        double dx = (this.latitude - latitude) * METER_PER_DEGREE;
        double dy = (this.longitude - longitude) * METER_PER_DEGREE * Math.cos(this.latitude);
        double distance = Math.sqrt(dx * dx + dy * dy);

        return (int) (Math.round(distance) / AVERAGE_WALKING_SPEED);
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
