package com.bang_ggood.station.controller;

import com.bang_ggood.station.dto.StationResponse;
import com.bang_ggood.station.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/stations/nearest")
    public ResponseEntity<StationResponse> readNearestStation(@RequestParam("latitude") double latitude,
                                                              @RequestParam("longitude") double longitude) {

        StationResponse response = stationService.readNearestStation(latitude, longitude);
        return ResponseEntity.ok(response);
    }
}
