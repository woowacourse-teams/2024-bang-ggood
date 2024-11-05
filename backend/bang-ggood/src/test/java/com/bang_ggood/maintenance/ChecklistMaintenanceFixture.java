package com.bang_ggood.maintenance;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import java.util.List;

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

    public static ChecklistMaintenance CHECKLIST1_MAINTENANCE_GAS(Checklist checklist) {
        return new ChecklistMaintenance(
                checklist,
                MaintenanceItem.GAS
        );
    }

    public static List<ChecklistMaintenance> CHECKLIST1_MAINTENANCES(Checklist checklist) {
        return List.of(CHECKLIST1_MAINTENANCE_WATERWORKS(checklist), CHECKLIST1_MAINTENANCE_INTERNET(checklist));
    }

    public static List<ChecklistMaintenance> CHECKLIST1_MAINTENANCES_UPDATE(Checklist checklist) {
        return List.of(CHECKLIST1_MAINTENANCE_GAS(checklist));
    }

    public static List<ChecklistMaintenance> CHECKLIST1_MAINTENANCES_DUPLICATE(Checklist checklist) {
        return List.of(CHECKLIST1_MAINTENANCE_WATERWORKS(checklist), CHECKLIST1_MAINTENANCE_WATERWORKS(checklist));
    }
}
