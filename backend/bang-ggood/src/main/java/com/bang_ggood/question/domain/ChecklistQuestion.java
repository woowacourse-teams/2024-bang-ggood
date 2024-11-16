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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class ChecklistQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    @JoinColumn(name = "question_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;

    @Enumerated(EnumType.STRING)
    private Answer answer;

    public ChecklistQuestion(Checklist checklist, Question question, Answer answer) {
        this.checklist = checklist;
        this.answer = answer;
        this.question = question;
    }

    public void change(ChecklistQuestion checklistQuestion) {
        this.answer = checklistQuestion.answer;
    }

    public boolean isDifferentQuestionId(ChecklistQuestion checklistQuestion) { // TODO 리팩토링
        return !getQuestionId().equals(checklistQuestion.getQuestionId());
    }

    public Long getChecklistId() {
        return checklist.getId();
    }

    public Integer getQuestionId() {
        return question.getId();
    }

    public boolean isCategory(Category category) {
        return question.getCategory().equals(category);
    }

    public boolean hasAnswer(Answer answer) {
        return this.answer.equals(answer);
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
