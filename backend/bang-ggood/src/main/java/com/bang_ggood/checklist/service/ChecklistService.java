package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.ChecklistScore;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.CategoryScoreReadResponse;
import com.bang_ggood.checklist.dto.response.ChecklistWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
    }

    @Transactional
    public UserChecklistsPreviewResponse readUserChecklistsPreview(User user) {
        List<Checklist> checklists = checklistRepository.findByUser(user);
        List<UserChecklistPreviewResponse> responses = checklists.stream()
                .map(this::getChecklistPreview)
                .toList();

        return new UserChecklistsPreviewResponse(responses);
    }

    private UserChecklistPreviewResponse getChecklistPreview(Checklist checklist) {
        return UserChecklistPreviewResponse.of(checklist, createBadges(checklist.getQuestions()));
    }

    private List<BadgeResponse> createBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(Category.values())
                .map(category -> category.provideBadge(questions))
                .filter(badge -> badge != Badge.NONE)
                .map(BadgeResponse::from)
                .toList();
    }

    @Transactional
    public ChecklistsWithScoreReadResponse readChecklistsComparison(List<Long> checklistIds) {
        User user = new User(1L, "방끗");

        validateChecklistComparison(checklistIds);

        List<ChecklistWithScoreReadResponse> responses = checklistRepository.findByUserAndIdIn(user, checklistIds)
                .stream()
                .map(this::getChecklistWithScore)
                .sorted(Comparator.comparing(ChecklistWithScoreReadResponse::score).reversed())
                .toList();

        return new ChecklistsWithScoreReadResponse(responses);
    }

    private void validateChecklistComparison(List<Long> checklistIds) {
        validateChecklistComparisonCount(checklistIds);
        validateChecklist(checklistIds);
    }

    private void validateChecklistComparisonCount(List<Long> checklistIds) {
        if (checklistIds.size() > 3) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT);
        }
    }

    private void validateChecklist(List<Long> checklistIds) {
        if (checklistRepository.countAllByIdIn(checklistIds) != checklistIds.size()) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND);
        }
    }



    private ChecklistWithScoreReadResponse getChecklistWithScore(Checklist checklist) {
        List<CategoryScoreReadResponse> categoryScores = getCategoryScores(checklist.getQuestions());
        int checklistScore = getChecklistScore(checklist.getQuestions());
        int checklistOptionCount = checklistOptionRepository.countByChecklist(checklist);

        return ChecklistWithScoreReadResponse.of(checklist, checklistOptionCount, checklistScore, categoryScores);
    }

    private List<CategoryScoreReadResponse> getCategoryScores(List<ChecklistQuestion> questions) {
        return Arrays.stream(Category.values())
                .map(category -> CategoryScoreReadResponse.of(category, ChecklistScore.calculateCategoryScore(category, questions)))
                .filter(response -> response.score() != 0)
                .toList();
    }

    private int getChecklistScore(List<ChecklistQuestion> questions) {
        return ChecklistScore.calculateTotalScore(questions);
    }
}
