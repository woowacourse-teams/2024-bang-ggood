package com.bang_ggood.question;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import java.util.List;

public class ChecklistQuestionFixture {

    public static ChecklistQuestion CHECKLIST1_QUESTION1(Checklist checklist) {
        return new ChecklistQuestion(
                checklist,
                Question.ROOM_CONDITION_1,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION10(Checklist checklist) {
        return new ChecklistQuestion(
                checklist,
                Question.WINDOW_1,
                Answer.GOOD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION10_UPDATE_ANSWER(Checklist checklist) {
        return new ChecklistQuestion(
                checklist,
                Question.WINDOW_1,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION11(Checklist checklist) {
        return new ChecklistQuestion(
                checklist,
                Question.WINDOW_2,
                null
        );
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS(Checklist checklist) {
        return List.of(CHECKLIST1_QUESTION1(checklist), CHECKLIST1_QUESTION10(checklist));
    }

    public static List<ChecklistQuestion> CHECKLIST1_DUPLICATE(Checklist checklist) {
        return List.of(CHECKLIST1_QUESTION1(checklist), CHECKLIST1_QUESTION1(checklist));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_UPDATE(Checklist checklist) {
        return List.of(CHECKLIST1_QUESTION1(checklist), CHECKLIST1_QUESTION10_UPDATE_ANSWER(checklist));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_LENGTH(Checklist checklist) {
        return List.of(CHECKLIST1_QUESTION10_UPDATE_ANSWER(checklist));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_QUESTION(Checklist checklist) {
        return List.of(CHECKLIST1_QUESTION10_UPDATE_ANSWER(checklist), CHECKLIST1_QUESTION11(checklist));
    }
}
