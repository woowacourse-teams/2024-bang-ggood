package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import java.util.List;

public class ChecklistFixture {

    public static Checklist CHECKLIST1_USER1(Room room, User user) {
        return new Checklist(
                room,
                user,
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static Checklist CHECKLIST2_USER1(Room room, User user) {
        return new Checklist(
                room,
                user,
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static Checklist CHECKLIST3_USER1(Room room, User user) {
        return new Checklist(
                room,
                user,
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static Checklist CHECKLIST3_USER2(Room room, User user) {
        return new Checklist(
                room,
                user,
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static Checklist CHECKLIST1_WITH_USER1_ID(Room room) {
        return new Checklist(
                room,
                UserFixture.USER1_WITH_ID(),
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개사", "메모", "한줄평"
        );
    }

    public static QuestionRequest QUESTION_1_CREATE_REQUEST() {
        return new QuestionRequest(1, "GOOD");
    }

    public static QuestionRequest QUESTION_2_CREATE_REQUEST() {
        return new QuestionRequest(2, "GOOD");
    }

    public static QuestionRequest QUESTION_3_CREATE_REQUEST() {
        return new QuestionRequest(3, "BAD");
    }

    public static QuestionRequest QUESTION_4_CREATE_REQUEST() {
        return new QuestionRequest(4, "BAD");
    }

    public static QuestionRequest QUESTION_5_CREATE_REQUEST() {
        return new QuestionRequest(5, "GOOD");
    }

    public static QuestionRequest QUESTION_5_UPDATE_REQUEST() {
        return new QuestionRequest(5, "GOOD");
    }

    public static QuestionRequest QUESTION_CREATE_REQUEST_NO_ID() {
        return new QuestionRequest(null, "NONE");
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(), List.of(1, 2, 3, 5),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME(), List.of(1, 2, 3, 5),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(1, 2, 3, 4),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME(), List.of(1, 2, 3, 4),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(), List.of(1, 2, 3, 5),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_CREATE_REQUEST_NO_ID())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(1, 2, 3, 4),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_CREATE_REQUEST_NO_ID())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_INVALID_OPTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(1, 2, 4, 9999),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(), List.of(1, 2, 3, 5),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_3_CREATE_REQUEST())
        );
    }


    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_DUPLICATED_OPTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(1, 2, 4, 4),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }


    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(1, 2, 3, 4),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_4_CREATE_REQUEST())
        );
    }


    public static ChecklistQuestion CHECKLIST_QUESTION_1(Checklist checklist) {
        return new ChecklistQuestion(checklist, Question.fromId(1), Answer.BAD);
    }

    public static ChecklistQuestion CHECKLIST_QUESTION_2(Checklist checklist) {
        return new ChecklistQuestion(checklist, Question.fromId(2), Answer.BAD);
    }

    public static ChecklistLike CHECKLIST1_LIKE(Checklist checklist) {
        return new ChecklistLike(checklist);
    }

    public static ChecklistLike CHECKLIST2_LIKE(Checklist checklist) {
        return new ChecklistLike(checklist);
    }

    public static ChecklistMaintenance CHECKLIST1_INCLUDED_MAINTENANCE_1(Checklist checklist) {
        return new ChecklistMaintenance(
                checklist, MaintenanceItem.ELECTRICITY
        );
    }

    public static ChecklistMaintenance CHECKLIST1_INCLUDED_MAINTENANCE_2(Checklist checklist) {
        return new ChecklistMaintenance(
                checklist, MaintenanceItem.GAS
        );
    }
}
