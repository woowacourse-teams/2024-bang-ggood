package com.bang_ggood.station.controller;

import com.bang_ggood.station.dto.SubwayStationResponse;
import com.bang_ggood.station.service.SubwayStationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class SubwayStationController {

    private final SubwayStationService subwayStationService;

    public SubwayStationController(SubwayStationService subwayStationService) {
        this.subwayStationService = subwayStationService;
    }

    @GetMapping("/stations/nearest")
    public ResponseEntity<List<SubwayStationResponse>> readNearestStation(@RequestParam("latitude") double latitude,
                                                                          @RequestParam("longitude") double longitude) {

        List<SubwayStationResponse> response = subwayStationService.readNearestStation(latitude, longitude);
        return ResponseEntity.ok(response);
    }
}
