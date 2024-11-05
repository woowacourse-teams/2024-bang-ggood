package com.bang_ggood.station.controller;

import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.SubwayStationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubwayStationController {

    private final SubwayStationService subwayStationService;

    public SubwayStationController(SubwayStationService subwayStationService) {
        this.subwayStationService = subwayStationService;
    }

    @GetMapping("/stations/nearest")
    public ResponseEntity<SubwayStationResponses> readNearestStation(@RequestParam("latitude") Double latitude,
                                                                     @RequestParam("longitude") Double longitude) {

        SubwayStationResponses response = subwayStationService.readNearestStation(latitude, longitude);
        return ResponseEntity.ok(response);
    }
}
