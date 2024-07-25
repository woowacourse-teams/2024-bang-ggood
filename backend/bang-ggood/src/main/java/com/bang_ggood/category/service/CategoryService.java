package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.domain.CategoryPriority;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.dto.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.CategoryReadResponse;
import com.bang_ggood.category.repository.CategoryPriorityRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static com.bang_ggood.exception.ExceptionCode.CATEGORY_DUPLICATED;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_NOT_FOUND;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_PRIORITY_INVALID_COUNT;

@Service
public class CategoryService {

    private static final int MAX_CATEGORY_PRIORITY_COUNT = 3;

    private final CategoryPriorityRepository categoryPriorityRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryPriorityRepository categoryPriorityRepository, UserRepository userRepository) {
        this.categoryPriorityRepository = categoryPriorityRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createCategoriesPriority(CategoryPriorityCreateRequest request) {
        validateDuplication(request);
        validateCategoryCount(request);
        validateCategoryId(request);

        User user = userRepository.getUserById(1L);
        List<CategoryPriority> categoryPriorities = request.categoryIds().stream()
                .map(id -> new CategoryPriority(id, user))
                .toList();

        categoryPriorityRepository.saveAll(categoryPriorities);
    }

    private void validateDuplication(CategoryPriorityCreateRequest request) {
        if (request.categoryIds().size() != Set.copyOf(request.categoryIds()).size()) {
            throw new BangggoodException(CATEGORY_DUPLICATED);
        }
    }

    private void validateCategoryCount(CategoryPriorityCreateRequest request) {
        if (request.categoryIds().size() > MAX_CATEGORY_PRIORITY_COUNT) {
            throw new BangggoodException(CATEGORY_PRIORITY_INVALID_COUNT);
        }
    }

    private void validateCategoryId(CategoryPriorityCreateRequest request) {
        for (Integer id : request.categoryIds()) {
            if (!Category.contains(id)) {
                throw new BangggoodException(CATEGORY_NOT_FOUND);
            }
        }
    }

    public CategoriesReadResponse readCategories() {
        List<CategoryReadResponse> categoryReadResponses = Arrays.stream(Category.values())
                .map(CategoryReadResponse::from)
                .toList();
        return new CategoriesReadResponse(categoryReadResponses);
    }
}
