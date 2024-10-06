package com.bang_ggood.maintenance.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.repository.ChecklistMaintenanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class ChecklistMaintenanceService {

    private final ChecklistMaintenanceRepository checklistMaintenanceRepository;

    @Transactional
    public void createMaintenances(List<ChecklistMaintenance> maintenances) {
        validateMaintenancesDuplicate(maintenances);
        checklistMaintenanceRepository.saveAll(maintenances);
    }

    private void validateMaintenancesDuplicate(List<ChecklistMaintenance> maintenances) {
        Set<Integer> set = new HashSet<>();
        maintenances.forEach(maintenance -> {
            Integer id = maintenance.getMaintenanceItemId();
            if (!set.add(id)) {
                throw new BangggoodException(ExceptionCode.MAINTENANCE_ITEM_DUPLICATE);
            }
        });
    }

    @Transactional(readOnly = true)
    public List<ChecklistMaintenance> readChecklistMaintenances(Checklist checklist) {
        return checklistMaintenanceRepository.findAllByChecklistId(checklist.getId());
    }

    @Transactional
    public void deleteAllByChecklistId(Long id) {
        checklistMaintenanceRepository.deleteAllByChecklistId(id);
    }

    @Transactional
    public void updateMaintenances(Long checklistId, List<ChecklistMaintenance> checklistMaintenances) {
        validateMaintenancesDuplicate(checklistMaintenances);
        checklistMaintenanceRepository.deleteAllByChecklistId(checklistId);
        checklistMaintenanceRepository.saveAll(checklistMaintenances);
    }
}
