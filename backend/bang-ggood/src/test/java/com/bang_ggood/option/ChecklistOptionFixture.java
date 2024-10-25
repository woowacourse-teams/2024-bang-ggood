package com.bang_ggood.option;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;
import java.util.List;

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

    public static ChecklistOption CHECKLIST1_OPTION_ELEVATOR(Checklist checklist) {
        return new ChecklistOption(
                checklist,
                Option.ELEVATOR.getId()
        );
    }

    public static List<ChecklistOption> CHECkLIST1_OPTIONS(Checklist checklist) {
        return List.of(CHECKLIST1_OPTION_CLOSET(checklist), CHECKLIST1_OPTION_BED(checklist));
    }

    public static List<ChecklistOption> CHECkLIST1_OPTIONS_UPDATE(Checklist checklist) {
        return List.of(CHECKLIST1_OPTION_ELEVATOR(checklist));
    }

    public static List<ChecklistOption> CHECkLIST1_OPTIONS_DUPLICATE(Checklist checklist) {
        return List.of(CHECKLIST1_OPTION_CLOSET(checklist), CHECKLIST1_OPTION_CLOSET(checklist));
    }
}
