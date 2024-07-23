package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;

@Table(name = "checklist_question")
@Entity
public class ChecklistQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Checklist checklist;

    private int questionId;

    private String answer;

    public ChecklistQuestion(Checklist checklist, int questionId, String answer) {
        this.checklist = checklist;
        this.questionId = questionId;
        this.answer = answer;
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

    public String getAnswer() {
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
                ", questionId=" + questionId +
                ", answer=" + answer +
                '}';
    }
}
