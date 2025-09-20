package com.bang_ggood.option.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.option.ChecklistOptionFixture;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
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

class ChecklistOptionServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistOptionService checklistOptionService;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("옵션 작성 성공")
    @Test
    void createOptions() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        List<ChecklistOption> checklistOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS(checklist);

        //when
        checklistOptionService.createOptions(checklistOptions);

        //then
        assertThat(checklistOptionRepository.findAllByChecklistId(checklist.getId())).hasSize(checklistOptions.size());
    }

    @DisplayName("옵션 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createOption_duplicateId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        List<ChecklistOption> checklistOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS_DUPLICATE(checklist);

        // when & then
        assertThatThrownBy(
                () -> checklistOptionService.createOptions(checklistOptions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }

    @DisplayName("옵션 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        List<ChecklistOption> checklistOptions = List.of(
                ChecklistOptionFixture.CHECKLIST1_OPTION_CLOSET(checklist),
                ChecklistOptionFixture.CHECKLIST1_OPTION_BED(checklist)
        );
        checklistOptionService.createOptions(checklistOptions);

        //when
        checklistOptionService.deleteAllByChecklistId(checklist.getId());

        //then
        assertThat(checklistOptionRepository.findAllByChecklistId(checklist.getId())).hasSize(0);
    }

    @DisplayName("옵션 수정 성공")
    @Test
    void updateOptions() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        List<ChecklistOption> checklistOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS(checklist);
        checklistOptionService.createOptions(checklistOptions);

        //when
        List<ChecklistOption> updateOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS_UPDATE(checklist);
        checklistOptionService.updateOptions(checklist.getId(), updateOptions);

        //then
        assertAll(
                () -> assertThat(checklistOptionRepository.findAllByChecklistId(checklist.getId())).hasSize(
                        updateOptions.size())
        );
    }

    @DisplayName("옵션 수정 실패: 옵션 id가 중복일 경우")
    @Test
    void updateOptions_duplicateId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        List<ChecklistOption> checklistOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS(checklist);
        checklistOptionService.createOptions(checklistOptions);

        // when & then
        List<ChecklistOption> updateOptions = ChecklistOptionFixture.CHECkLIST1_OPTIONS_DUPLICATE(checklist);
        assertThatThrownBy(
                () -> checklistOptionService.updateOptions(checklist.getId(), updateOptions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }
}
