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
import java.util.Objects;

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

    protected Room() {
    }

    public Room(String name, String address, String buildingName, String station, Integer walkingTime,
                FloorLevel floorLevel, Integer floor, Structure structure, Double size) {
        this.name = name;
        this.address = address;
        this.buildingName = buildingName;
        this.station = station;
        this.walkingTime = walkingTime;
        this.floorLevel = floorLevel;
        this.floor = floor;
        this.structure = structure;
        this.size = size;
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
        validateFloorAndLevel();
    }

    private void validateFloorAndLevel() {
        if (floorLevel != FloorLevel.GROUND && floor != null) {
            throw new BangggoodException(ExceptionCode.ROOM_FLOOR_AND_LEVEL_INVALID);
        }
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public String getStation() {
        return station;
    }

    public Integer getWalkingTime() {
        return walkingTime;
    }

    public FloorLevel getFloorLevel() {
        return floorLevel;
    }

    public Integer getFloor() {
        return floor;
    }

    public Structure getStructure() {
        return structure;
    }

    public Double getSize() {
        return size;
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
                '}';
    }
}
