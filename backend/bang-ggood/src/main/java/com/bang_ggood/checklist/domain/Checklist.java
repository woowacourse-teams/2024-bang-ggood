package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;
import java.util.Objects;

@Entity
public class Checklist extends BaseEntity {

    private static final int MEMO_MAX_LENGTH = 1000;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

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

    @OneToMany(mappedBy = "checklist")
    private List<ChecklistQuestion> questions;

  
    public Checklist(Room room, User user, Integer deposit, Integer rent, Integer maintenanceFee,
                     Integer contractTerm, OccupancyMonth occupancyMonth, OccupancyPeriod occupancyPeriod,
                     String realEstate, String memo, String summary) {
        this.room = room;
        this.user = user;
        this.deposit = deposit;
        this.rent = rent;
        this.maintenanceFee = maintenanceFee;
        this.contractTerm = contractTerm;
        this.occupancyMonth = occupancyMonth;
        this.occupancyPeriod = occupancyPeriod;
        this.realEstate = realEstate;
        this.memo = memo;
        this.summary = summary;
        validateMemoLength();
    }

    public Checklist(Integer deposit, Integer rent, Integer maintenanceFee, Integer contractTerm,
                     OccupancyMonth occupancyMonth, OccupancyPeriod occupancyPeriod, String realEstate,
                     String memo, String summary) {
        this(null, null, deposit, rent, maintenanceFee, contractTerm, occupancyMonth, occupancyPeriod, realEstate, memo,
                summary);
    }

    protected Checklist() {
    }

    public boolean isOwnedBy(User user) {
        return this.user.equals(user);
    }

    public void change(Checklist updateChecklist) {
        this.room = updateChecklist.room;
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

    public Long getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

    public User getUser() {
        return user;
    }

    public Integer getDeposit() {
        return deposit;
    }

    public Integer getRent() {
        return rent;
    }

    public Integer getMaintenanceFee() {
        return maintenanceFee;
    }

    public Integer getContractTerm() {
        return contractTerm;
    }

    public String getRealEstate() {
        return realEstate;
    }

    public String getMemo() {
        return memo;
    }

    public String getSummary() {
        return summary;
    }

    public String getRoomName() {
        return room.getName();
    }

    public String getRoomAddress() {
        return room.getAddress();
    }

    public String getRoomBuildingName() {
        return room.getBuildingName();
    }

    public Integer getRoomFloor() {
        return room.getFloor();
    }

    public String getRoomStation() {
        return room.getStation();
    }

    public Integer getRoomWalkingTime() {
        return room.getWalkingTime();
    }

    public Double getRoomSize() {
        return room.getSize();
    }

    public FloorLevel getRoomFloorLevel() {
        return room.getFloorLevel();
    }

    public Structure getRoomStructure() {
        return room.getStructure();
    }

    public Integer getOccupancyMonth() {
        return occupancyMonth.getMonth();
    }

    public String getOccupancyPeriod() {
        return occupancyPeriod.getPeriod();
    }

    public List<ChecklistQuestion> getQuestions() {
        return questions;
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
                ", room=" + room +
                ", user=" + user +
                ", deposit=" + deposit +
                ", rent=" + rent +
                ", maintenanceFee=" + maintenanceFee +
                ", contractTerm=" + contractTerm +
                ", occupancyMonth=" + occupancyMonth +
                ", occupancyPeriod=" + occupancyPeriod +
                ", realEstate='" + realEstate + '\'' +
                ", memo='" + memo + '\'' +
                ", summary='" + summary + '\'' +
                ", questions=" + questions +
                '}';
    }
}
