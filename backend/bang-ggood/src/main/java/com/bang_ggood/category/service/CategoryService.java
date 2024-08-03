package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.domain.CategoryPriority;
import com.bang_ggood.category.dto.request.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.response.CategoriesReadResponse;
import com.bang_ggood.category.dto.response.CategoryReadResponse;
import com.bang_ggood.category.dto.response.CategoriesReadResponse;
import com.bang_ggood.category.dto.request.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.response.CategoryReadResponse;
import com.bang_ggood.category.repository.CategoryPriorityRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.user.domain.User;
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

    private static final int MAX_CATEGORY_PRIORITY = 3;
    private final CategoryPriorityRepository categoryPriorityRepository;

    public CategoryService(CategoryPriorityRepository categoryPriorityRepository) {
        this.categoryPriorityRepository = categoryPriorityRepository;
    }

    @Transactional
    public void createCategoriesPriority(CategoryPriorityCreateRequest request) {
        User user = new User(1L, "방방이");
        validate(request);
        List<CategoryPriority> categoryPriorities = request.categoryIds().stream()
                .map(id -> new CategoryPriority(id, user))
                .toList();
        categoryPriorityRepository.saveAll(categoryPriorities);
    }

    private void validate(CategoryPriorityCreateRequest request) {
        validateCategoryCount(request);
        validateDuplication(request);
        validateCategoryId(request);
    }

    private void validateCategoryCount(CategoryPriorityCreateRequest request) {
        if (request.categoryIds().size() > MAX_CATEGORY_PRIORITY) {
            throw new BangggoodException(CATEGORY_PRIORITY_INVALID_COUNT);
        }
    }

    private void validateDuplication(CategoryPriorityCreateRequest request) {
        int originalSize = request.categoryIds().size();
        int distinctSize = Set.copyOf(request.categoryIds()).size();
        if (originalSize != distinctSize) {
            throw new BangggoodException(CATEGORY_DUPLICATED);
        }
    }

    private void validateCategoryId(CategoryPriorityCreateRequest request) {
        request.categoryIds().stream()
                .filter(id -> !Category.contains(id))
                .findAny()
                .ifPresent(id -> { throw new BangggoodException(CATEGORY_NOT_FOUND); });
    }

    public CategoriesReadResponse readCategories() {
        List<CategoryReadResponse> categoryReadResponses = Arrays.stream(Category.values())
                .map(category -> new CategoryReadResponse(category.getId(), category.getName()))
                .toList();
        return new CategoriesReadResponse(categoryReadResponses);
    }
}
