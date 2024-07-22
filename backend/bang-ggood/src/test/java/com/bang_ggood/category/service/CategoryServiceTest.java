package com.bang_ggood.category.service;

import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.dto.CategoryPriorityCreateRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import java.util.List;

import static com.bang_ggood.category.domain.Category.AMENITY;
import static com.bang_ggood.category.domain.Category.CLEAN;
import static com.bang_ggood.category.domain.Category.ECONOMIC;
import static com.bang_ggood.category.domain.Category.values;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @DisplayName("카테고리 우선순위 생성 성공")
    @Test
    void createCategoriesPriority() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(
                CLEAN.getId(),
                AMENITY.getId(),
                ECONOMIC.getId()
        ));

        // when & then
        Assertions.assertThatCode(() -> categoryService.createCategoriesPriority(request))
                .doesNotThrowAnyException();
        // TODO: 추후 예외 처리 예정
    }

    @DisplayName("카테고리 조회 성공")
    @Test
    void readCategories() {
        // given & when
        CategoriesReadResponse categoriesReadResponse = categoryService.readCategories();

        // then
        Assertions.assertThat(categoriesReadResponse.categories())
                .hasSize(values().length);
    }
}
