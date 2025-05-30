package com.bang_ggood.checklist.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.config.UserPrincipal;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.ChecklistCompareResponses;
import com.bang_ggood.checklist.dto.response.ChecklistShareResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChecklistController {

    private final ChecklistManageService checklistManageService;

    @PostMapping("/v1/checklists")
    public ResponseEntity<Void> createChecklistV1(@AuthRequiredPrincipal User user,
                                                  @Valid @RequestBody ChecklistRequest checklistRequest) {
        long checklistId = checklistManageService.createChecklist(user, checklistRequest);
        return ResponseEntity.created(URI.create("/checklist/" + checklistId)).build();
    }

    @PostMapping(value = "/v2/checklists", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> createChecklistV2(
            @AuthRequiredPrincipal User user,
            @RequestPart @Valid ChecklistRequest checklistRequest,
            @RequestPart List<MultipartFile> images
    ) {
        long checklistId = checklistManageService.createChecklistV2(user, checklistRequest, images);
        return ResponseEntity.created(URI.create("/checklist/" + checklistId)).build();
    }


    @PostMapping("/v1/checklists/{id}/share")
    public ResponseEntity<ChecklistShareResponse> createChecklistShareLink(@AuthRequiredPrincipal User user,
                                                                           @PathVariable("id") Long checklistId) {
        ChecklistShareResponse response = checklistManageService.createChecklistShare(user, checklistId);
        return ResponseEntity.created(URI.create("/v1/checklists/share/" + response.token())).body(response);
    }

    @GetMapping("v1/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistByIdV1(@UserPrincipal User user,
                                                                         @PathVariable("id") Long checklistId) {
        return ResponseEntity.ok(checklistManageService.readChecklist(user, checklistId));
    }

    @GetMapping("/v1/checklists")
    public ResponseEntity<ChecklistsPreviewResponse> readChecklistsPreviewV1(@UserPrincipal User user) {
        return ResponseEntity.ok(checklistManageService.readAllChecklistsPreview(user));
    }

    @GetMapping("/v1/checklists/like")
    public ResponseEntity<ChecklistsPreviewResponse> readLikedChecklistsPreviewV1(@AuthRequiredPrincipal User user) {
        return ResponseEntity.ok(checklistManageService.readLikedChecklistsPreview(user));
    }

    @GetMapping("/v1/checklists/comparison")
    public ResponseEntity<ChecklistCompareResponses> readChecklistsCompare(@AuthRequiredPrincipal User user,
                                                                           @RequestParam("id") List<Long> checklistIds) {
        return ResponseEntity.ok(checklistManageService.compareChecklists(user, checklistIds));
    }

    @GetMapping("/v1/checklists/share/{token}")
    public ResponseEntity<SelectedChecklistResponse> readSharedChecklist(@PathVariable("token") String token) {
        return ResponseEntity.ok(checklistManageService.readSharedChecklist(token));
    }

    @PutMapping("/v1/checklists/{id}")
    public ResponseEntity<Void> updateChecklistByIdV1(
            @AuthRequiredPrincipal User user,
            @PathVariable("id") long id,
            @Valid @RequestBody ChecklistRequest checklistRequest) {
        checklistManageService.updateChecklistById(user, id, checklistRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<Void> deleteChecklistById(@AuthRequiredPrincipal User user, @PathVariable("id") long id) {
        checklistManageService.deleteChecklistById(user, id);
        return ResponseEntity.noContent().build();
    }
}
