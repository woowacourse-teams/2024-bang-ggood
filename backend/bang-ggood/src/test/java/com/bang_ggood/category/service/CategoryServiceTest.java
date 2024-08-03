package com.bang_ggood.category.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.request.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.response.CategoriesReadResponse;
import com.bang_ggood.exception.BangggoodException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static com.bang_ggood.exception.ExceptionCode.CATEGORY_DUPLICATED;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_NOT_FOUND;
import static com.bang_ggood.exception.ExceptionCode.CATEGORY_PRIORITY_INVALID_COUNT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CategoryServiceTest extends IntegrationTestSupport {

    @Autowired
    CategoryService categoryService;

    @DisplayName("카테고리 우선순위 저장 성공")
    @Test
    void createCategoriesPriority() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(1, 2, 3));

        // when && then
        assertThatCode(() -> categoryService.createCategoriesPriority(request))
                .doesNotThrowAnyException();
    }

    @DisplayName("카테고리 우선순위 저장 실패 : 올바르지 않은 ID")
    @Test
    void createCategoriesPriority_invalidId_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(999));

        // when && then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_NOT_FOUND.getMessage());
    }

    @DisplayName("카테고리 우선순위 저장 실패 : 최대 선택 개수 초과")
    @Test
    void createCategoriesPriority_overMaxCount_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9));

        // when && then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_PRIORITY_INVALID_COUNT.getMessage());
    }

    @DisplayName("카테고리 우선순위 저장 실패 : 중복된 ID")
    @Test
    void createCategoriesPriority_duplication_exception() {
        // given
        CategoryPriorityCreateRequest request = new CategoryPriorityCreateRequest(List.of(1, 1));

        // when && then
        assertThatThrownBy(() -> categoryService.createCategoriesPriority(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(CATEGORY_DUPLICATED.getMessage());
    }

    @DisplayName("카테고리 목록 조회 성공")
    @Test
    void readCategories() {
        // given & when
        CategoriesReadResponse response = categoryService.readCategories();

        // then
        assertThat(response.categories()).hasSize(Category.values().length);
    }
}
