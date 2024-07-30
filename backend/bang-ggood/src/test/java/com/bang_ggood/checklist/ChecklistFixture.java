package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.request.QuestionCreateRequest;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.domain.User;

import java.util.List;

public class ChecklistFixture {

    public static final Checklist checklist = new Checklist(
            new User(1L, "방방이"),
            RoomFixture.ROOM,
            1000, 50, 12, "방끗공인중개사"
    );

    public static final QuestionCreateRequest QUESTION_1_CREATE_REQUEST = new QuestionCreateRequest(
            1, "GOOD"
    );

    public static final QuestionCreateRequest QUESTION_2_CREATE_REQUEST = new QuestionCreateRequest(
            2, "SOSO"
    );

    public static final QuestionCreateRequest QUESTION_3_CREATE_REQUEST = new QuestionCreateRequest(
            3, "BAD"
    );

    public static final QuestionCreateRequest QUESTION_5_CREATE_REQUEST = new QuestionCreateRequest(
            5, null
    );

    public static final QuestionCreateRequest QUESTION_CREATE_REQUEST_NO_ID = new QuestionCreateRequest(
            null, null
    );

    public static final QuestionCreateRequest QUESTION_CREATE_REQUEST_INVALID_ID = new QuestionCreateRequest(
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