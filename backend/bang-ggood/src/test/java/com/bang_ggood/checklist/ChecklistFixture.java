package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.QuestionRequest;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.domain.User;

import java.util.List;

public class ChecklistFixture {

    public static final Checklist checklist = new Checklist(
            new User(1L, "방방이", "bang-ggood@gmail.com"),
            RoomFixture.ROOM_1,
            1000, 50, 12, "방끗공인중개사"
    );

    public static final QuestionRequest QUESTION_1_CREATE_REQUEST = new QuestionRequest(
            1, "GOOD", "메모1"
    );

    public static final QuestionRequest QUESTION_2_CREATE_REQUEST = new QuestionRequest(
            2, "SOSO", null
    );

    public static final QuestionRequest QUESTION_3_CREATE_REQUEST = new QuestionRequest(
            3, "BAD", "메모3"
    );

    public static final QuestionRequest QUESTION_4_CREATE_REQUEST = new QuestionRequest(
            4, "SOSO", null
    );

    public static final QuestionRequest QUESTION_5_CREATE_REQUEST = new QuestionRequest(
            5, "GOOD", null
    );

    public static final QuestionRequest QUESTION_5_UPDATE_REQUEST = new QuestionRequest(
            5, "GOOD", "메모"
    );

    public static final QuestionRequest QUESTION_CREATE_REQUEST_NO_ID = new QuestionRequest(
            null, "NONE", "메모"
    );

    public static final QuestionRequest QUESTION_CREATE_REQUEST_INVALID_ID = new QuestionRequest(
            9999, "SOSO", null
    );


    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_UPDATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_UPDATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_NO_ID)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_NO_ID)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_INVALID_ID)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_INVALID_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_CREATE_REQUEST_INVALID_ID)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_INVALID_OPTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 9999),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_INVALID_OPTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 4, 9999),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_UPDATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 5),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_3_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_DUPLICATED_QUESTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_3_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_CREATE_REQUEST_DUPLICATED_OPTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_CREATE_REQUEST, List.of(1, 2, 3, 3),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_DUPLICATED_OPTION_ID = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 4, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_5_UPDATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION_LENGTH = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST)
    );

    public static final ChecklistRequest CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION = new ChecklistRequest(
            RoomFixture.ROOM_UPDATE_REQUEST, List.of(1, 2, 3, 4),
            List.of(QUESTION_1_CREATE_REQUEST, QUESTION_2_CREATE_REQUEST,
                    QUESTION_3_CREATE_REQUEST, QUESTION_4_CREATE_REQUEST)
    );


    public static final ChecklistQuestion CHECKLIST_QUESTION_1 = new ChecklistQuestion(
            checklist, Question.fromId(1), Grade.BAD, "메모"
    );

    public static final ChecklistQuestion CHECKLIST_QUESTION_2 = new ChecklistQuestion(
            checklist, Question.fromId(2), Grade.BAD, "메모"
    );
}
