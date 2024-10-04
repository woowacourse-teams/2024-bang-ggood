package com.bang_ggood.station.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class ChecklistStation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long checklistId;

    private String stationName;

    private String stationLine;

    public ChecklistStation(Long checklistId, String stationName, String stationLine) {
        this.checklistId = checklistId;
        this.stationName = stationName;
        this.stationLine = stationLine;
    }

    protected ChecklistStation() {
    }

    public Long getId() {
        return id;
    }

    public Long getChecklistId() {
        return checklistId;
    }

    public String getStationName() {
        return stationName;
    }

    public String getStationLine() {
        return stationLine;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChecklistStation that = (ChecklistStation) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
