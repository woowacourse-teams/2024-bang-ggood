package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import java.util.ArrayList;
import java.util.List;

import static com.bang_ggood.user.UserFixture.USER1;

public class CustomChecklistFixture {

    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT =
            List.of(new CustomChecklistQuestion(USER1, Question.ROOM_CONDITION_1),
                    new CustomChecklistQuestion(USER1, Question.WINDOW_6),
                    new CustomChecklistQuestion(USER1, Question.BATHROOM_8),
                    new CustomChecklistQuestion(USER1, Question.SECURITY_11));
    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST =
            new CustomChecklistUpdateRequest(List.of(Question.ROOM_CONDITION_1.getId(),
                    Question.WINDOW_6.getId(),
                    Question.BATHROOM_8.getId(),
                    Question.SECURITY_11.getId()));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY =
            new CustomChecklistUpdateRequest(new ArrayList<>());

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED =
            new CustomChecklistUpdateRequest(List.of(1, 1, 1));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID =
            new CustomChecklistUpdateRequest(List.of(99999));
}
