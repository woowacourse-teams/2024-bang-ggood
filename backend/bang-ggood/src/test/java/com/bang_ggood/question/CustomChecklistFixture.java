package com.bang_ggood.question;

import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import java.util.ArrayList;
import java.util.List;

import static com.bang_ggood.user.UserFixture.USER1;

public class CustomChecklistFixture {

    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT =
            List.of(new CustomChecklistQuestion(USER1, Question.ROOM_CONDITION_1),
                    new CustomChecklistQuestion(USER1, Question.WINDOW_1),
                    new CustomChecklistQuestion(USER1, Question.BATHROOM_1),
                    new CustomChecklistQuestion(USER1, Question.SECURITY_1));
    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST =
            new CustomChecklistUpdateRequest(List.of(Question.ROOM_CONDITION_1.getId(),
                    Question.WINDOW_6.getId(),
                    Question.BATHROOM_1.getId(),
                    Question.SECURITY_1.getId()));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY =
            new CustomChecklistUpdateRequest(new ArrayList<>());

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED =
            new CustomChecklistUpdateRequest(List.of(1, 1, 1));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID =
            new CustomChecklistUpdateRequest(List.of(99999));
}
