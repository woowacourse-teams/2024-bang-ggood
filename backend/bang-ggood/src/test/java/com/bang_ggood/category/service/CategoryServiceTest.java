package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CategoryServiceTest {

    CategoryService categoryService = new CategoryService();

    @DisplayName("카테고리 목록 조회 성공")
    @Test
    void readCategories() {
        // given & when
        CategoriesReadResponse response = categoryService.readCategories();

        // then
        assertThat(response.categories()).hasSize(Category.values().length);
    }
}
