package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
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

    private String name;

    private Double latitude;

    private Double longitude;

    public Building(String address, String name, Double latitude,
                    Double longitude) {
        this.address = address;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        validateNullBuilding();
    }

    public void changeName(String name) {
        this.name = name;
    }

    private void validateNullBuilding() {
        boolean anyNull = address == null || latitude == null || longitude == null;
        boolean allNull = address == null && latitude == null && longitude == null;

        if (anyNull && !allNull) {
            throw new BangggoodException(ExceptionCode.BUILDING_ALL_NULL_OR_NOT_NULL);
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
        Building building = (Building) o;
        return Objects.equals(id, building.id) && Objects.equals(address, building.address)
                && Objects.equals(name, building.name)
                && Objects.equals(latitude, building.latitude) && Objects.equals(longitude,
                building.longitude);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, name, latitude, longitude);
    }

    @Override
    public String toString() {
        return "Building{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", name='" + name + '\'' +
                ", latitude=" + latitude + '\'' +
                ", longitude=" + longitude +
                '}';
    }
}
