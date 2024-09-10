package com.bang_ggood.question;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;

public class ChecklistQuestionFixture {

    public static ChecklistQuestion CHECKLIST1_QUESTION1 = new ChecklistQuestion(
            ChecklistFixture.CHECKLIST1_USER1,
            Question.ROOM_CONDITION_1,
            Answer.BAD
    );

    public static ChecklistQuestion CHECKLIST1_QUESTION10 = new ChecklistQuestion(
            ChecklistFixture.CHECKLIST1_USER1,
            Question.WINDOW_1,
            Answer.GOOD
    );
}
