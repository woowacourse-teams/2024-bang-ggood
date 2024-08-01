package com.bang_ggood.room.domain;

import com.bang_ggood.BaseEntity;
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

    private Integer floor;

    private String address;

    private String station;

    private Integer walkingTime;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Integer size;

    @Enumerated(EnumType.STRING)
    private FloorLevel floorLevel;

    @Enumerated(EnumType.STRING)
    private Structure structure;

    public Room(String name, Integer floor, String address, String station, Integer walkingTime,
                Type type, Integer size, FloorLevel floorLevel, Structure structure) {
        this.name = name;
        this.floor = floor;
        this.address = address;
        this.station = station;
        this.walkingTime = walkingTime;
        this.type = type;
        this.size = size;
        this.floorLevel = floorLevel;
        this.structure = structure;
    }

    protected Room() {
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
                ", floor=" + floor +
                ", address='" + address + '\'' +
                ", station='" + station + '\'' +
                ", walkingTime=" + walkingTime +
                ", type=" + type +
                ", size=" + size +
                ", floorLevel=" + floorLevel +
                ", structure=" + structure +
                '}';
    }
}
