package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


class ChecklistRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 성공")
    @Test
    void findById() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        //when
        Checklist foundChecklist = checklistRepository.getById(savedChecklist.getId());

        //then
        assertThat(foundChecklist.getId()).isEqualTo(savedChecklist.getId());
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 실패 : 해당하는 체크리스트가 없을 경우")
    @Test
    void findById_notFound_exception() {
        assertThatThrownBy(() -> checklistRepository.getById(1L))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("체크리스트 아이디 리스트 중 유저가 생성한 체크리스트 목록 갖고 오기 성공")
    @Test
    void findByUserAndIdIn() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        assertThat(checklistRepository.findByUserAndIdIn(user, List.of(savedChecklist.getId())))
                .isEqualTo(List.of(savedChecklist));
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 논리적 삭제를 적용해서 체크리스트 리스트를 조회한다.")
    @Test
    void findAllByUser() {
        // given
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        User user = UserFixture.USER1;
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room1, user));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(room2, user));
        checklistRepository.saveAll(List.of(checklist1, checklist2));

        checklistRepository.deleteById(checklist1.getId());

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist2);
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 체크리스트를 최신순으로 조회한다.")
    @Test
    void findAllByUser_OrderByLatest() {
        // given
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room1, user));
        checklistRepository.save(checklist1);

        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(room2, user));
        checklistRepository.save(checklist2);

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user);

        // then
        Assertions.assertThat(checklists).containsExactly(checklist2, checklist1);
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 사용자의 체크리스트만 조회한다.")
    @Test
    void findAllByUser_OnlyUserChecklists() {
        // given
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        User user1 = userRepository.save(UserFixture.USER1());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room1, user1));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(room2, user1));

        User user2 = userRepository.save(UserFixture.USER2());
        Room room3 = roomRepository.save(RoomFixture.ROOM_3());
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER2(room3, user2);

        checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user1);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist1, checklist2);
    }

    @Transactional
    @DisplayName("체크리스트 좋아요 필터링 조회 성공")
    @Test
    void findAllByUserAndIsLiked() {
        // given
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        Room room3 = roomRepository.save(RoomFixture.ROOM_3());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room1, user));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room2, user));
        Checklist checklist3 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room3, user));
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE(checklist1));
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST2_LIKE(checklist2));

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserAndIsLiked(user);

        // then
        Assertions.assertThat(checklists)
                .containsOnly(checklist1, checklist2);
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하는 경우")
    @Test
    void existsById_true() {
        //given & when
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isTrue();
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하지 않는 경우")
    @Test
    void existsById_false() {
        //given & when & then
        assertThat(checklistRepository.existsById(1L)).isFalse();
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        //when
        checklistRepository.deleteById(savedChecklist.getId());

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId())).isFalse();
    }
}
