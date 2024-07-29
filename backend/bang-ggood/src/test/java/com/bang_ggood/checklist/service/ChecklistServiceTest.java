package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;

    @DisplayName("체크리스트 리스트 조회 성공")
    @Test
    void readUserChecklistsPreview() {
        // given
        User user = new User(1L, "방방이");
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
                new ChecklistQuestion(checklist, Question.CLEAN_5, null));

        roomRepository.save(room);
        checklistRepository.save(checklist);
        checklistQuestionRepository.saveAll(questions);

        // when
        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);

        // then
        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
        Assertions.assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        Assertions.assertThat(previewResponse1.badge())
                .containsExactlyInAnyOrder(new BadgeResponse(
                        Badge.CLEAN.getShortNameWithEmoji(),
                        Badge.CLEAN.getLongNameWithEmoji()));
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 뱃지가 존재하지 않을 때")
    @Test
    void readUserChecklistsPreview_NoBadge() {
        // given
        User user = new User(1L, "방방이"); //TODO 리팩토링 필요
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.BAD),
                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.BAD),
                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
                new ChecklistQuestion(checklist, Question.CLEAN_5, null));

        roomRepository.save(room);
        checklistRepository.save(checklist);
        checklistQuestionRepository.saveAll(questions);

        // when
        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);

        // then
        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
        Assertions.assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        Assertions.assertThat(previewResponse1.badge()).isEmpty();
    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void readChecklistsComparison() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> checklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(), checklists.get(2).getId());

        // when
        ChecklistsWithScoreReadResponse response = checklistService.readChecklistsComparison(checklistIds);

        // then
        Assertions.assertThat(response.checklists()).hasSize(3);
    }

    @DisplayName("체크리스트 비교 실패 : 아이디 개수가 유효하지 않을 때")
    @Test
    void readChecklistsComparison_invalidIdCount() {
        // given
        List<Long> invalidChecklistIds = List.of(1L, 2L, 3L, 4L);

        // when & then
        Assertions.assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT.getMessage());
    }

    @DisplayName("체크리스트 비교 실패 : 유효하지 않은 체크리스트 id 존재")
    @Test
    void readChecklistsComparison_invalidId() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> invalidChecklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(), checklists.get(2).getId() + 1);

        // when & then
        Assertions.assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    public static Checklist createChecklist(User user, Room room) {
        return new Checklist(user, room, 1000, 60, 24, "방끗부동산");
    }
}
