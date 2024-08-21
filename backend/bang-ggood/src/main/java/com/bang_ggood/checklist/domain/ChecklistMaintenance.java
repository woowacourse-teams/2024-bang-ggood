package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.util.Objects;

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

    protected ChecklistMaintenance() {
    }

    public Long getId() {
        return id;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    public MaintenanceItem getMaintenanceItem() {
        return maintenanceItem;
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
