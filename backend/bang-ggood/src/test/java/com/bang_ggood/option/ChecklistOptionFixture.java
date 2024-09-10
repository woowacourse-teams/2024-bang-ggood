package com.bang_ggood.option;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;

public class ChecklistOptionFixture {

    public static ChecklistOption CHECKLIST1_OPTION_CLOSET = new ChecklistOption(
            ChecklistFixture.CHECKLIST1_USER1,
            Option.CLOSET.getId()
    );

    public static ChecklistOption CHECKLIST1_OPTION_BED = new ChecklistOption(
            ChecklistFixture.CHECKLIST1_USER1,
            Option.BED.getId()
    );
}
