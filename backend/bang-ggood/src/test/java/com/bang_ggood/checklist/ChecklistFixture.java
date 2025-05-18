package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.ChecklistRequestV1;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.question.QuestionFixture;
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

    public static Checklist CHECKLIST1_USER1_UPDATE(Room room, User user) {
        return new Checklist(
                room,
                user,
                1000, 50, 5, 12,
                OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY,
                "방끗공인중개", "메모 추가", "한줄평 수정"
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
        return new QuestionRequest(QuestionFixture.QUESTION1_CATEGORY1.getId(), "GOOD");
    }

    public static QuestionRequest QUESTION_2_CREATE_REQUEST() {
        return new QuestionRequest(QuestionFixture.QUESTION2_CATEGORY1.getId(), "GOOD");
    }

    public static QuestionRequest QUESTION_3_CREATE_REQUEST() {
        return new QuestionRequest(QuestionFixture.QUESTION3_CATEGORY2.getId(), "BAD");
    }

    public static QuestionRequest QUESTION_4_CREATE_REQUEST() {
        return new QuestionRequest(QuestionFixture.QUESTION4_CATEGORY2.getId(), "BAD");
    }

    public static QuestionRequest QUESTION_5_CREATE_REQUEST() {
        return new QuestionRequest(QuestionFixture.QUESTION5_CATEGORY2.getId(), "GOOD");
    }

    public static QuestionRequest QUESTION_5_UPDATE_REQUEST() {
        return new QuestionRequest(QuestionFixture.QUESTION5_CATEGORY2.getId(), "GOOD");
    }

    public static QuestionRequest QUESTION_CREATE_REQUEST_NO_ID() {
        return new QuestionRequest(null, "NONE");
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_EMPTY_LOCATION() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST_EMPTY_LOCATION(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequestV1 CHECKLIST_CREATE_REQUEST_V1_EMPTY_LOCATION() {
        return new ChecklistRequestV1(
                RoomFixture.ROOM_CREATE_REQUEST_EMPTY_LOCATION(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST2() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.CLOSET.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_4_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_CREATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(), List.of(Option.REFRIGERATOR.getId(), Option.INDUCTION.getId(),
                Option.BED.getId(), Option.WASHING_MACHINE.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST_NO_ROOM_NAME(),
                List.of(Option.REFRIGERATOR.getId(), Option.BED.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_5_UPDATE_REQUEST())
        );
    }

    public static ChecklistRequest CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_CREATE_REQUEST(),
                List.of(Option.REFRIGERATOR.getId(), Option.SINK.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_CREATE_REQUEST_NO_ID())
        );
    }

    public static ChecklistRequest CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID() {
        return new ChecklistRequest(
                RoomFixture.ROOM_UPDATE_REQUEST(),
                List.of(Option.REFRIGERATOR.getId(), Option.BED.getId(), Option.INDUCTION.getId(),
                        Option.SHOE_RACK.getId()),
                List.of(QUESTION_1_CREATE_REQUEST(), QUESTION_2_CREATE_REQUEST(),
                        QUESTION_3_CREATE_REQUEST(), QUESTION_CREATE_REQUEST_NO_ID())
        );
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

    public static ChecklistShare CHECKLIST_SHARE(Checklist checklist) {
        return new ChecklistShare(checklist.getId(), "token");
    }
}
