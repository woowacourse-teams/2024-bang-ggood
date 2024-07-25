package com.bang_ggood.checklist;

import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistQuestionCreateRequest;
import com.bang_ggood.room.RoomFixture;
import java.util.List;

public class ChecklistFixture {

    public static final ChecklistQuestionCreateRequest QUESTION_1_CREATE_REQUEST = new ChecklistQuestionCreateRequest(
            1, "GOOD"
    );

    public static final ChecklistQuestionCreateRequest QUESTION_2_CREATE_REQUEST = new ChecklistQuestionCreateRequest(
            2, "SOSO"
    );

    public static final ChecklistQuestionCreateRequest QUESTION_3_CREATE_REQUEST = new ChecklistQuestionCreateRequest(
            3, "BAD"
    );

    public static final ChecklistQuestionCreateRequest QUESTION_5_CREATE_REQUEST = new ChecklistQuestionCreateRequest(
            5, null
    );

    public static final ChecklistQuestionCreateRequest QUESTION_CREATE_REQUEST_NO_ID = new ChecklistQuestionCreateRequest(
            null, null
    );

    public static final ChecklistQuestionCreateRequest QUESTION_CREATE_REQUEST_INVALID_ID = new ChecklistQuestionCreateRequest(
            9999, "SOSO"
    );


    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_NO_ID)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_INVALID_ID)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_INVALID_OPTION_ID = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 9999),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_3_CREATE_REQUEST)
    );

    public static final ChecklistCreateRequest CHECKLIST_CREATE_REQUEST_DUPLICATED_OPTION_ID = new ChecklistCreateRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 3),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );
}
