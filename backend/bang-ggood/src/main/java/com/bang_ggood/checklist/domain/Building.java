package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class Building extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String buildingName;

    private String station;

    private Integer walkingTime;

    private Double latitude;

    private Double longitude;

    public Building(String address, String buildingName, String station, Integer walkingTime, Double latitude,
                    Double longitude) {
        this.address = address;
        this.buildingName = buildingName;
        this.station = station;
        this.walkingTime = walkingTime;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Building building = (Building) o;
        return Objects.equals(id, building.id) && Objects.equals(address, building.address)
                && Objects.equals(buildingName, building.buildingName) && Objects.equals(station,
                building.station) && Objects.equals(walkingTime, building.walkingTime)
                && Objects.equals(latitude, building.latitude) && Objects.equals(longitude,
                building.longitude);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, buildingName, station, walkingTime, latitude, longitude);
    }

    @Override
    public String toString() {
        return "Building{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", buildingName='" + buildingName + '\'' +
                ", station='" + station + '\'' +
                ", walkingTime=" + walkingTime +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
