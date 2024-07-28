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
public class ChecklistQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    private int questionId;

    @Enumerated(value = EnumType.STRING)
    private Grade grade;

    public ChecklistQuestion(Checklist checklist, int questionId, Grade grade) {
        this.checklist = checklist;
        this.questionId = questionId;
        this.grade = grade;
    }

    protected ChecklistQuestion() {
    }

    public Long getId() {
        return id;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    public int getQuestionId() {
        return questionId;
    }

    public Question getQuestion() {
        return Question.findById(questionId);
    }

    public Grade getGrade() {
        return grade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistQuestion that = (ChecklistQuestion) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChecklistQuestion{" +
                "id=" + id +
                ", checklist=" + checklist +
                ", questionId=" + questionId +
                ", grade=" + grade +
                '}';
    }
}
