package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Entity;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    private Room room;

    private Integer deposit;

    private Integer rent;

    private Integer contractTerm;

    private String realEstate;

    @OneToMany(mappedBy = "checklist")
    private List<ChecklistQuestion> questions;

    public Checklist(User user, Room room, Integer deposit, Integer rent, Integer contractTerm, String realEstate) {
        this.user = user;
        this.room = room;
        this.deposit = deposit;
        this.rent = rent;
        this.contractTerm = contractTerm;
        this.realEstate = realEstate;
    }

    public Checklist(Integer deposit, Integer rent, Integer contractTerm, String realEstate) {
        this(null, null, deposit, rent, contractTerm, realEstate);
    }

    protected Checklist() {
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

    public Integer getRoomFloor() { return room.getFloor(); }

    public String getRoomStation() { return room.getStation(); }

    public Integer getRoomWalkingTime() { return room.getWalkingTime(); }

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
                ", user=" + user +
                ", room=" + room +
                ", deposit=" + deposit +
                ", rent=" + rent +
                ", contractTerm=" + contractTerm +
                ", realEstate='" + realEstate + '\'' +
                '}';
    }
}
