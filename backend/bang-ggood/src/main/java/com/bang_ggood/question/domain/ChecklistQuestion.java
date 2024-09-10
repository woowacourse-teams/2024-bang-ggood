package com.bang_ggood.question.domain;

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
    private Answer answer;

    public ChecklistQuestion(Checklist checklist, Question question, Answer answer) {
        this.checklist = checklist;
        this.question = question;
        this.answer = answer;
    }

    protected ChecklistQuestion() {
    }

    public void change(ChecklistQuestion checklistQuestion) {
        this.checklist = checklistQuestion.checklist;
        this.question = checklistQuestion.question;
        this.answer = checklistQuestion.answer;
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

    public Integer getQuestionId() {
        return question.getId();
    }

    public Answer getAnswer() {
        return answer;
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
                ", answer=" + answer +
                '}';
    }
}