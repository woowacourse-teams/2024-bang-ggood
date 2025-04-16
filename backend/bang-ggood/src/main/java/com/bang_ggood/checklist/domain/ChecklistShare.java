package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChecklistShare extends BaseEntity {

    @Id
    private Long checklistId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklistId", referencedColumnName = "id", insertable = false, updatable = false)
    private Checklist checklist;

    private String token;

    public ChecklistShare(Long checklistId, String token) {
        this.checklistId = checklistId;
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistShare that = (ChecklistShare) o;
        return Objects.equals(checklistId, that.checklistId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(checklistId);
    }

    @Override
    public String toString() {
        return "ChecklistShare{" +
                "checklistId=" + checklistId +
                ", checklist=" + checklist +
                ", token='" + token + '\'' +
                '}';
    }
}
