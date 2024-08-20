package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Answer;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistLike;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.OccupancyMonth;
import com.bang_ggood.checklist.domain.OccupancyPeriod;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.QuestionRequest;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import java.util.List;

public class ChecklistFixture {

    public static final Checklist CHECKLIST1_USER1 = new Checklist(
            RoomFixture.ROOM_1,
            UserFixture.USER1,
            1000, 50, 5, 12,
            OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
            "방끗공인중개사", "메모", "한줄평"
    );

    public static final Checklist CHECKLIST2_USER1 = new Checklist(
            RoomFixture.ROOM_2,
            UserFixture.USER1,
            1000, 50, 5, 12,
            OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
            "방끗공인중개사", "메모", "한줄평"
    );

    public static final Checklist CHECKLIST3_USER1 = new Checklist(
            RoomFixture.ROOM_3,
            UserFixture.USER1,
            1000, 50, 5, 12,
            OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
            "방끗공인중개사", "메모", "한줄평"
    );

    public static final Checklist CHECKLIST3_USER2 = new Checklist(
            RoomFixture.ROOM_3,
            UserFixture.USER2,
            1000, 50, 5, 12,
            OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
            "방끗공인중개사", "메모", "한줄평"
    );

    public static final Checklist CHECKLIST1_WITH_USER1_ID = new Checklist(
            RoomFixture.ROOM_1,
            UserFixture.USER1_WITH_ID,
            1000, 50, 5, 12,
            OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
            "방끗공인중개사", "메모", "한줄평"
    );

    public static final QuestionRequest QUESTION_1_CREATE_REQUEST = new QuestionRequest(
            1, "GOOD"
    );

    public static final QuestionRequest QUESTION_2_CREATE_REQUEST = new QuestionRequest(
            2, "GOOD"
    );

    public static final QuestionRequest QUESTION_3_CREATE_REQUEST = new QuestionRequest(
            3, "BAD"
    );

    public static final QuestionRequest QUESTION_4_CREATE_REQUEST = new QuestionRequest(
            4, "BAD"
    );

    public static final QuestionRequest QUESTION_5_CREATE_REQUEST = new QuestionRequest(
            5, "GOOD"
    );

    public static final QuestionRequest QUESTION_5_UPDATE_REQUEST = new QuestionRequest(
            5, "GOOD"
    );

    public static final QuestionRequest QUESTION_CREATE_REQUEST_NO_ID = new QuestionRequest(
            null, "NONE"
    );

    public static final QuestionRequest QUESTION_CREATE_REQUEST_INVALID_ID = new QuestionRequest(
            9999, "GOOD"
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
            CHECKLIST1_USER1, Question.fromId(1), Answer.BAD
    );

    public static final ChecklistQuestion CHECKLIST_QUESTION_2 = new ChecklistQuestion(
            CHECKLIST1_USER1, Question.fromId(2), Answer.BAD
    );

    public static final ChecklistLike CHECKLIST1_LIKE = new ChecklistLike(CHECKLIST1_USER1);

    public static final ChecklistLike CHECKLIST2_LIKE = new ChecklistLike(CHECKLIST2_USER1);
}
