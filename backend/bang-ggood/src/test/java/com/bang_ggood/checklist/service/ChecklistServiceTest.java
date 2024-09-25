package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;


class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);

        //when
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(checklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(checklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(checklist.getSummary())
        );
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklist() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistService.createChecklist(ChecklistFixture.CHECKLIST1_USER1(room, user));

        //when
        Checklist updateChecklist = ChecklistFixture.CHECKLIST1_USER1_UPDATE(room, user);
        checklistService.updateChecklist(savedChecklist, updateChecklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(updateChecklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(updateChecklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(updateChecklist.getSummary())
        );
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //when
        checklistService.deleteById(checklist.getId());

        //then
        assertThat(checklistRepository.findById(checklist.getId()).isEmpty()).isTrue();
    }

    @DisplayName("체크리스트 리스트 최신순으로 조회 성공")
    @Test
    void readAllChecklistsOrderByLatest() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());

        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(room1, user);
        Checklist checklist2 = ChecklistFixture.CHECKLIST3_USER2(room2, user);

        checklistService.createChecklist(checklist1);
        checklistService.createChecklist(checklist2);

        // when
        List<Checklist> checklists = checklistService.readAllChecklistsOrderByLatest(user);

        // then
        assertThat(checklists).containsExactly(checklist2, checklist1);
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedChecklistsPreview() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        Room room3 = roomRepository.save(RoomFixture.ROOM_3());
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(room1, user);
        Checklist checklist2 = ChecklistFixture.CHECKLIST2_USER1(room2, user);
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER1(room3, user);
        checklistRepository.saveAll(
                List.of(checklist1, checklist2, checklist3)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_LIKE(checklist1),
                        ChecklistFixture.CHECKLIST2_LIKE(checklist2))
        );

        //when
        List<Checklist> checklists = checklistService.readLikedChecklistsPreview(user);

        //then
        assertAll(
                () -> assertThat(checklists.size()).isEqualTo(2),
                () -> assertThat(checklists.get(0).getId()).isEqualTo(checklist1.getId()),
                () -> assertThat(checklists.get(1).getId()).isEqualTo(checklist2.getId())
        );
    }
}
