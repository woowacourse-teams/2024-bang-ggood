package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final CategoryRepository categoryRepository;

    public List<CategoryEntity> findAllCategories() {
        return categoryRepository.findAll();
    }
}
