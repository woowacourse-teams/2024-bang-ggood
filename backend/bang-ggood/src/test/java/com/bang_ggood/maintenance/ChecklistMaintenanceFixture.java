package com.bang_ggood.maintenance;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;

public class ChecklistMaintenanceFixture {

    public static ChecklistMaintenance CHECKLIST1_MAINTENANCE_WATERWORKS = new ChecklistMaintenance(
            ChecklistFixture.CHECKLIST1_USER1,
            MaintenanceItem.WATERWORKS
    );

    public static ChecklistMaintenance CHECKLIST1_MAINTENANCE_INTERNET = new ChecklistMaintenance(
            ChecklistFixture.CHECKLIST1_USER1,
            MaintenanceItem.INTERNET
    );
}
