package com.bang_ggood.room.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Room extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String buildingName;

    private String station;

    private Integer walkingTime;

    @Enumerated(EnumType.STRING)
    private FloorLevel floorLevel;

    private Integer floor;

    @Enumerated(EnumType.STRING)
    private Structure structure;

    private Double size;

    private Double latitude;

    private Double longitude;

    public Room(String name, String address, String buildingName, String station, Integer walkingTime,
                FloorLevel floorLevel, Integer floor, Structure structure, Double size, Double latitude, Double longitude) {
        this.name = name;
        this.address = address;
        this.buildingName = buildingName;
        this.station = station;
        this.walkingTime = walkingTime;
        this.floorLevel = floorLevel;
        this.floor = floor;
        this.structure = structure;
        this.size = size;
        this.latitude = latitude;
        this.longitude = longitude;
        validateFloorAndLevel();
    }

    public void change(Room room) {
        this.name = room.name;
        this.address = room.address;
        this.buildingName = room.buildingName;
        this.station = room.station;
        this.walkingTime = room.walkingTime;
        this.floorLevel = room.floorLevel;
        this.floor = room.floor;
        this.structure = room.structure;
        this.size = room.size;
        this.latitude = room.latitude;
        this.longitude = room.longitude;
        validateFloorAndLevel();
    }

    private void validateFloorAndLevel() {
        if (floorLevel != FloorLevel.GROUND && floor != null) {
            throw new BangggoodException(ExceptionCode.ROOM_FLOOR_AND_LEVEL_INVALID);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Room room = (Room) o;
        return Objects.equals(id, room.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", buildingName='" + buildingName + '\'' +
                ", station='" + station + '\'' +
                ", walkingTime=" + walkingTime +
                ", floorLevel=" + floorLevel +
                ", floor=" + floor +
                ", structure=" + structure +
                ", size=" + size +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
