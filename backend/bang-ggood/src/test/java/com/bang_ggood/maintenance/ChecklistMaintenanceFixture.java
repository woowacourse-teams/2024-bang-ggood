package com.bang_ggood.maintenance;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;

public class ChecklistMaintenanceFixture {

    public static ChecklistMaintenance CHECKLIST1_MAINTENANCE_WATERWORKS(Checklist checklist) {
        return new ChecklistMaintenance(
                checklist,
                MaintenanceItem.WATERWORKS
        );
    }

    public static ChecklistMaintenance CHECKLIST1_MAINTENANCE_INTERNET(Checklist checklist) {
        return new ChecklistMaintenance(
                checklist,
                MaintenanceItem.INTERNET
        );
    }
}
