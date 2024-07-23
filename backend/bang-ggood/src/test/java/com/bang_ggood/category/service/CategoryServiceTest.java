package com.bang_ggood.category.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.dto.CategoryPriorityCreateRequest;
import com.bang_ggood.exception.BangggoodException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static com.bang_ggood.category.domain.Category.AMENITY;
import static com.bang_ggood.category.domain.Category.CLEAN;
import static com.bang_ggood.category.domain.Category.ECONOMIC;
import static com.bang_ggood.category.domain.Category.SECURITY;
import static com.bang_ggood.category.domain.Category.values;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_DUPLICATED;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_NOT_FOUND;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_PRIORITY_INVALID_COUNT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CategoryServiceTest extends IntegrationTestSupport {

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
        assertThatCode(() -> categoryService.createCategoriesPriority(request))
                .doesNotThrowAnyException();
        // TODO: 추후 우선순위 조회 API로 예외 검증
    }

    @DisplayName("카테고리 우선순위 생성 실패 : 카테고리 개수가 유효하지 않을 때")
    @Test
    void createCategoriesPriority_invalidCount_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(
                CLEAN.getId(),
                AMENITY.getId(),
                ECONOMIC.getId(),
                SECURITY.getId()
        ));

        // when & then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_PRIORITY_INVALID_COUNT.getMessage());
    }

    @DisplayName("카테고리 우선순위 생성 실패 : 카테고리가 존재하지 않을 때")
    @Test
    void createCategoriesPriority_notFound_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(
                CLEAN.getId(),
                AMENITY.getId(),
                0
        ));

        // when & then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_NOT_FOUND.getMessage());
    }

    @DisplayName("카테고리 우선순위 생성 실패 : 중복된 카테고리가 존재할 때")
    @Test
    void createCategoriesPriority_duplicated_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(
                CLEAN.getId(),
                AMENITY.getId(),
                AMENITY.getId()
        ));

        // when & then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_DUPLICATED.getMessage());
    }

    @DisplayName("카테고리 조회 성공")
    @Test
    void readCategories() {
        // given & when
        CategoriesReadResponse categoriesReadResponse = categoryService.readCategories();

        // then
        assertThat(categoriesReadResponse.categories())
                .hasSize(values().length);
    }
}
