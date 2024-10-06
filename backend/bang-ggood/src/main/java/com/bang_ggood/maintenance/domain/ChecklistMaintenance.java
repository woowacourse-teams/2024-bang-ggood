package com.bang_ggood.maintenance.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.checklist.domain.Checklist;
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
public class ChecklistMaintenance extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    @Enumerated(EnumType.STRING)
    private MaintenanceItem maintenanceItem;

    public ChecklistMaintenance(Checklist checklist, MaintenanceItem maintenanceItem) {
        this.checklist = checklist;
        this.maintenanceItem = maintenanceItem;
    }

    public Integer getMaintenanceItemId() {
        return maintenanceItem.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistMaintenance that = (ChecklistMaintenance) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChecklistMaintenance{" +
                "id=" + id +
                ", checklist=" + checklist +
                ", maintenanceItem='" + maintenanceItem + '\'' +
                '}';
    }
}
