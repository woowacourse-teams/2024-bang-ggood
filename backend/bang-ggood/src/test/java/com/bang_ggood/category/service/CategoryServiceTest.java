package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @DisplayName("카테고리 조회 성공")
    @Test
    void readCategories() {
        // given & when
        CategoriesReadResponse categoriesReadResponse = categoryService.readCategories();

        // then
        Assertions.assertThat(categoriesReadResponse.categories())
                .hasSize(Category.values().length);
    }
}
