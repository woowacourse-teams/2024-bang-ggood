package com.bang_ggood.station.service;

import com.bang_ggood.station.domain.Station;
import com.bang_ggood.station.dto.StationResponse;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class StationService {

    private static final int METER_PER_DEGREE = 111_320;
    private static final double AVERAGE_WALKING_SPEED = 1.3 * 60; // meter per minute

    private static final List<Station> stations = init();

    private static List<Station> init() {
        List<Station> stations = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource("seoul_stations_240819.csv");
        try (CSVReader csvReader = new CSVReaderBuilder(new InputStreamReader(resource.getInputStream(), Charset.forName("EUC-KR"))).build()) {

            String[] line = csvReader.readNext(); // drop first row
            while ((line = csvReader.readNext()) != null) {
                Station station = new Station(
                        Integer.parseInt(line[0]),
                        line[1],
                        line[2],
                        Double.parseDouble(line[3]),
                        Double.parseDouble(line[4]));
                stations.add(station);
            }
            return stations;
        } catch (IOException | CsvValidationException e) {
            throw new RuntimeException("지하철 데이터 파일을 읽어오는데 실패했습니다.");
        }
    }

    public StationResponse readNearestStation(double latitude, double longitude) {
        return stations.stream()
                .map(station -> {
                    double dx = (station.getLatitude() - latitude) * METER_PER_DEGREE;
                    double dy = (station.getLongitude() - longitude) * METER_PER_DEGREE * Math.cos(station.getLatitude());
                    double distance = Math.sqrt(dx * dx + dy * dy);
                    return StationResponse.of(station, (int) Math.round(distance / AVERAGE_WALKING_SPEED));
                })
                .min(Comparator.comparing(StationResponse::walkingTime))
                .orElseThrow(RuntimeException::new);
    }
}
