package com.bang_ggood.room.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
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

    private String station;

    private Integer walkingTime;

    private String address;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Integer size;

    private Integer floor;

    @Enumerated(EnumType.STRING)
    private FloorLevel floorLevel;

    @Enumerated(EnumType.STRING)
    private Structure structure;

    protected Room() {
    }

    public Room(String name, String station, Integer walkingTime, String address, Type type, Integer size,
                Integer floor, FloorLevel floorLevel, Structure structure) {
        this.name = name;
        this.station = station;
        this.walkingTime = walkingTime;
        this.address = address;
        this.type = type;
        this.size = size;
        this.floor = floor;
        this.floorLevel = floorLevel;
        this.structure = structure;
        validateFloorAndLevel();
    }

    public void change(Room room) {
        this.name = room.name;
        this.station = room.station;
        this.walkingTime = room.walkingTime;
        this.address = room.address;
        this.type = room.type;
        this.size = room.size;
        this.floor = room.floor;
        this.floorLevel = room.floorLevel;
        this.structure = room.structure;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getFloor() {
        return floor;
    }

    public String getAddress() {
        return address;
    }

    public String getStation() {
        return station;
    }

    public Integer getWalkingTime() {
        return walkingTime;
    }

    public Type getType() {
        return type;
    }

    public Integer getSize() {
        return size;
    }

    public FloorLevel getFloorLevel() {
        return floorLevel;
    }

    public Structure getStructure() {
        return structure;
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
                ", station='" + station + '\'' +
                ", walkingTime=" + walkingTime +
                ", address='" + address + '\'' +
                ", type=" + type +
                ", size=" + size +
                ", floor=" + floor +
                ", floorLevel=" + floorLevel +
                ", structure=" + structure +
                '}';
    }
}
