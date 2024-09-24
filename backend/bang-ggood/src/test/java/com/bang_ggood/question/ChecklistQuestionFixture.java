package com.bang_ggood.question;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;

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
}
