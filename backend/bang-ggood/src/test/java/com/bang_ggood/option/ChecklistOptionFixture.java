package com.bang_ggood.option;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;

public class ChecklistOptionFixture {

    public static ChecklistOption CHECKLIST1_OPTION_CLOSET(Checklist checklist) {
        return new ChecklistOption(
                checklist,
                Option.CLOSET.getId()
        );
    }

    public static ChecklistOption CHECKLIST1_OPTION_BED(Checklist checklist) {
        return new ChecklistOption(
                checklist,
                Option.BED.getId()
        );
    }
}
