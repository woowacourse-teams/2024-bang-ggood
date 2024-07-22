package com.bang_ggood.category.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.dto.CategoryReadResponse;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    public CategoriesReadResponse readCategories() {
        List<CategoryReadResponse> categoryReadResponses = Arrays.stream(Category.values())
                .map(CategoryReadResponse::from)
                .toList();
        return new CategoriesReadResponse(categoryReadResponses);
    }
}
