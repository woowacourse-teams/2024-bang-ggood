package com.bang_ggood.question.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.QuestionEntity;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class ChecklistQuestionService {

    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;
    private final QuestionService questionService; // TODO 리팩터링

    @Transactional
    public void createDefaultCustomQuestions(List<CustomChecklistQuestion> customChecklistQuestions) {
        customChecklistQuestionRepository.saveAll(customChecklistQuestions);
    }

    @Transactional
    public void createQuestions(List<ChecklistQuestion> checklistQuestions) {
        validateQuestionDuplicate(checklistQuestions);
        checklistQuestionRepository.saveAll(checklistQuestions);
    }

    private void validateQuestionDuplicate(List<ChecklistQuestion> questions) {
        Set<Integer> set = new HashSet<>();
        questions.forEach(question -> {
            if (!set.add(question.getQuestionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
            }
        });
    }

    @Transactional(readOnly = true)
    public List<CustomChecklistQuestion> readCustomChecklistQuestions(User user) {
        return customChecklistQuestionRepository.findAllByUser(user);
    }

    @Transactional
    public void updateCustomChecklist(User user, List<QuestionEntity> questions) {
        validateCustomChecklistQuestionsIsNotEmpty(questions);
        validateCustomChecklistQuestionsDuplication(questions);

        customChecklistQuestionRepository.deleteAllByUser(user);

        List<CustomChecklistQuestion> customChecklistQuestions = questions.stream()
                .map(question -> new CustomChecklistQuestion(user, questionService.readQuestion(question.getId())))
                .toList();
        customChecklistQuestionRepository.saveAll(customChecklistQuestions);
    }

    private void validateCustomChecklistQuestionsIsNotEmpty(List<QuestionEntity> questions) {
        if (questions.isEmpty()) {
            throw new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY);
        }
    }

    private void validateCustomChecklistQuestionsDuplication(List<QuestionEntity> questions) {
        if (questions.size() != Set.copyOf(questions).size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
        }
    }

    @Transactional(readOnly = true)
    public List<ChecklistQuestion> readChecklistQuestions(Checklist checklist) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findAllByChecklistId(checklist.getId());

        List<ChecklistQuestion> result = new ArrayList<>();
        for (ChecklistQuestion checklistQuestion : checklistQuestions) {
            if (checklistQuestion.getQuestionEntity() == null) {
                ChecklistQuestion checklistQuestion1 = checklistQuestionRepository.updateChecklistQuestionId(
                        checklistQuestion.getQuestionId(), checklistQuestion.getId());

                result.add(checklistQuestion1);
                continue;
            }

            result.add(checklistQuestion);
        }

        return result;
    }

    @Transactional(readOnly = true)
    public List<ChecklistQuestion> categorizeChecklistQuestions(CategoryEntity category, List<ChecklistQuestion> questions) {
        return questions.stream()
                .filter(question -> question.isCategory(category) && question.getAnswer() != null)
                .toList();
    }

    @Transactional
    public void deleteAllByChecklistId(Long id) {
        checklistQuestionRepository.deleteAllByChecklistId(id);
    }

    @Transactional
    public void updateQuestions(List<ChecklistQuestion> questions, List<ChecklistQuestion> updateQuestions) {
        validateQuestionDuplicate(updateQuestions);
        validateSameQuestions(questions, updateQuestions);
        for (int i = 0; i < questions.size(); i++) {
            questions.get(i).change(updateQuestions.get(i));
        }
        checklistQuestionRepository.saveAll(questions);
    }

    private void validateSameQuestions(List<ChecklistQuestion> questions, List<ChecklistQuestion> updateQuestions) {
        if (questions.size() != updateQuestions.size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DIFFERENT);
        }

        for (int i = 0; i < questions.size(); i++) {
            if (questions.get(i).isDifferentQuestionId(updateQuestions.get(i))) {
                throw new BangggoodException(ExceptionCode.QUESTION_DIFFERENT);
            }
        }
    }
}
