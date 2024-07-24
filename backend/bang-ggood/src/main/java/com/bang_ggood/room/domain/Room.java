package com.bang_ggood.room.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
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

    protected Room() {
    }

    public Room(String name, Integer floor, String address, String station, Integer walkingTime) {
        this.name = name;
        this.floor = floor;
        this.address = address;
        this.station = station;
        this.walkingTime = walkingTime;
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
                '}';
    }
}
