package com.bang_ggood.station.domain;

import com.bang_ggood.BaseEntity;
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
public class ChecklistStation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long checklistId;

    private String stationName;

    private String stationLine;

    private int walkingTime;

    public ChecklistStation(Long checklistId, String stationName, String stationLine, int walkingTime) {
        this.checklistId = checklistId;
        this.stationName = stationName;
        this.stationLine = stationLine;
        this.walkingTime = walkingTime;
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
