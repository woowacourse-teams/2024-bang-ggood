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

    @Enumerated(EnumType.STRING)
    private Question question;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    private String memo;

    public ChecklistQuestion(Checklist checklist, Question question, Grade grade, String memo) {
        this.checklist = checklist;
        this.question = question;
        this.grade = grade;
        this.memo = memo;
    }

    protected ChecklistQuestion() {
    }

    public void change(ChecklistQuestion checklistQuestion) {
        this.checklist = checklistQuestion.checklist;
        this.question = checklistQuestion.question;
        this.grade = checklistQuestion.grade;
        this.memo = checklistQuestion.memo;
    }

    public boolean isDifferentQuestionId(ChecklistQuestion checklistQuestion) {
        return this.question != checklistQuestion.question;
    }

    public Long getId() {
        return id;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    public Question getQuestion() {
        return question;
    }

    public Grade getGrade() {
        return grade;
    }

    public String getMemo() {
        return memo;
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
                ", question=" + question +
                ", grade=" + grade +
                ", memo='" + memo + '\'' +
                '}';
    }
}