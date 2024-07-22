package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.domain.CategoryPriority;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.dto.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.CategoryReadResponse;
import com.bang_ggood.category.repository.CategoryPriorityRepository;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryPriorityRepository categoryPriorityRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryPriorityRepository categoryPriorityRepository, UserRepository userRepository) {
        this.categoryPriorityRepository = categoryPriorityRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createCategoriesPriority(CategoryPriorityCreateRequest request) {
        User user = userRepository.getUserById(1L);
        List<CategoryPriority> categoryPriorities = request.categoryIds().stream()
                .map(id -> new CategoryPriority(id, user))
                .toList();

        categoryPriorityRepository.saveAll(categoryPriorities);
    }

    public CategoriesReadResponse readCategories() {
        List<CategoryReadResponse> categoryReadResponses = Arrays.stream(Category.values())
                .map(CategoryReadResponse::from)
                .toList();
        return new CategoriesReadResponse(categoryReadResponses);
    }


}
