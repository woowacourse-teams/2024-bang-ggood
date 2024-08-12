package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.domain.Type;
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

    private Integer contractTerm;

    private String realEstate;

    private String memo;

    private String summary;

    @Enumerated(EnumType.STRING)
    private OccupancyMonth occupancyMonth;

    @Enumerated(EnumType.STRING)
    private OccupancyPeriod occupancyPeriod;

    @OneToMany(mappedBy = "checklist")
    private List<ChecklistQuestion> questions;


    public Checklist(Room room, User user, Integer deposit, Integer rent, Integer contractTerm, String realEstate,
                     String memo, String summary, OccupancyMonth occupancyMonth, OccupancyPeriod occupancyPeriod) {
        this.room = room;
        this.user = user;
        this.deposit = deposit;
        this.rent = rent;
        this.contractTerm = contractTerm;
        this.realEstate = realEstate;
        this.memo = memo;
        this.summary = summary;
        this.occupancyMonth = occupancyMonth;
        this.occupancyPeriod = occupancyPeriod;
        validateMemoLength();
    }

    public Checklist(Integer deposit, Integer rent, Integer contractTerm, String realEstate,
                     String memo, String summary, OccupancyMonth occupancyMonth, OccupancyPeriod occupancyPeriod) {
        this(null, null, deposit, rent, contractTerm, realEstate, memo, summary, occupancyMonth, occupancyPeriod);
    }

    protected Checklist() {
    }

    public void change(Checklist updateChecklist) {
        this.user = updateChecklist.user;
        this.room = updateChecklist.room;
        this.deposit = updateChecklist.deposit;
        this.rent = updateChecklist.rent;
        this.contractTerm = updateChecklist.contractTerm;
        this.realEstate = updateChecklist.realEstate;
    }

    private void validateMemoLength() {
        if (memo.length() > MEMO_MAX_LENGTH) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_MEMO_INVALID_LENGTH);
        }
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Room getRoom() {
        return room;
    }

    public String getRoomName() {
        return room.getName();
    }

    public String getRoomAddress() {
        return room.getAddress();
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

    public Type getRoomType() {
        return room.getType();
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

    public Integer getDeposit() {
        return deposit;
    }

    public Integer getRent() {
        return rent;
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

    public OccupancyMonth getOccupancyMonth() {
        return occupancyMonth;
    }

    public OccupancyPeriod getOccupancyPeriod() {
        return occupancyPeriod;
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
                ", contractTerm=" + contractTerm +
                ", realEstate='" + realEstate + '\'' +
                ", memo='" + memo + '\'' +
                ", summary='" + summary + '\'' +
                ", occupancyMonth=" + occupancyMonth +
                ", occupancyPeriod=" + occupancyPeriod +
                '}';
    }
}
