package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class Checklist extends BaseEntity {

    private static final int MEMO_MAX_LENGTH = 1000;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Building building;

    private String name;

    @Enumerated(EnumType.STRING)
    private FloorLevel floorLevel;

    private Integer floor;

    @Enumerated(EnumType.STRING)
    private Structure structure;

    private Double size;

    private Integer deposit;

    private Integer rent;

    private Integer maintenanceFee;

    private Integer contractTerm;

    @Enumerated(EnumType.STRING)
    private OccupancyMonth occupancyMonth;

    @Enumerated(EnumType.STRING)
    private OccupancyPeriod occupancyPeriod;

    private String realEstate;

    private String memo;

    private String summary;

    public Checklist(User user, Building building, String name, FloorLevel floorLevel, Integer floor,
                     Structure structure, Double size,
                     Integer deposit, Integer rent, Integer maintenanceFee,
                     Integer contractTerm, OccupancyMonth occupancyMonth, OccupancyPeriod occupancyPeriod,
                     String realEstate, String memo, String summary) {
        this.user = user;
        this.building = building;
        this.name = name;
        this.floorLevel = floorLevel;
        this.floor = floor;
        this.structure = structure;
        this.size = size;
        this.deposit = deposit;
        this.rent = rent;
        this.maintenanceFee = maintenanceFee;
        this.contractTerm = contractTerm;
        this.occupancyMonth = occupancyMonth;
        this.occupancyPeriod = occupancyPeriod;
        this.realEstate = realEstate;
        this.memo = memo;
        this.summary = summary;
        validateFloorAndLevel();
        validateMemoLength();
    }

    public boolean isOwnedBy(User user) {
        return this.user.equals(user);
    }

    public void change(Checklist updateChecklist) {
        this.building = updateChecklist.building;
        this.name = updateChecklist.name;
        this.floorLevel = updateChecklist.floorLevel;
        this.floor = updateChecklist.floor;
        this.structure = updateChecklist.structure;
        this.size = updateChecklist.size;
        this.deposit = updateChecklist.deposit;
        this.rent = updateChecklist.rent;
        this.maintenanceFee = updateChecklist.maintenanceFee;
        this.contractTerm = updateChecklist.contractTerm;
        this.occupancyMonth = updateChecklist.occupancyMonth;
        this.occupancyPeriod = updateChecklist.occupancyPeriod;
        this.realEstate = updateChecklist.realEstate;
        this.memo = updateChecklist.memo;
        this.summary = updateChecklist.summary;
        validateMemoLength();
    }

    private void validateMemoLength() {
        if (memo != null && memo.length() > MEMO_MAX_LENGTH) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_MEMO_INVALID_LENGTH);
        }
    }

    private void validateFloorAndLevel() {
        if (floorLevel != FloorLevel.GROUND && floor != null) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_FLOOR_AND_LEVEL_INVALID);
        }
    }

    public String getBuildingAddress() {
        return building.getAddress();
    }

    public String getBuildingName() {
        return building.getName();
    }

    public String getBuildingStation() {
        return building.getStation();
    }

    public Integer getBuildingWalkingTime() {
        return building.getWalkingTime();
    }

    public Double getBuildingLatitude() {
        return building.getLatitude();
    }

    public Double getBuildingLongitude() {
        return building.getLongitude();
    }

    public Integer getOccupancyMonth() {
        return occupancyMonth.getMonth();
    }

    public String getOccupancyPeriod() {
        return occupancyPeriod.getPeriod();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Checklist checklist = (Checklist) o;
        return Objects.equals(id, checklist.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Checklist{" +
                "id=" + id +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", floorLevel=" + floorLevel +
                ", floor=" + floor +
                ", structure=" + structure +
                ", size=" + size +
                ", deposit=" + deposit +
                ", rent=" + rent +
                ", maintenanceFee=" + maintenanceFee +
                ", contractTerm=" + contractTerm +
                ", occupancyMonth=" + occupancyMonth +
                ", occupancyPeriod=" + occupancyPeriod +
                ", realEstate='" + realEstate + '\'' +
                ", memo='" + memo + '\'' +
                ", summary='" + summary + '\'' +
                '}';
    }
}
