package com.bang_ggood.checklist;

import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import java.util.ArrayList;
import java.util.List;

public class CustomChecklistFixture {

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST =
            new CustomChecklistUpdateRequest(List.of(1, 3, 5, 7, 8, 11, 15, 30));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY =
            new CustomChecklistUpdateRequest(new ArrayList<>());

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED =
            new CustomChecklistUpdateRequest(List.of(1, 1, 1));

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID =
            new CustomChecklistUpdateRequest(List.of(99999));
}
