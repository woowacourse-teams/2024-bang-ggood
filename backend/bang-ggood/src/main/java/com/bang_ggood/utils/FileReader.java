package com.bang_ggood.utils;

import com.bang_ggood.station.domain.Station;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class FileReader {

    public static final String stationPath = "seoul_stations_240819.csv";

    public static List<Station> readStationData() {
        List<Station> stations = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource(stationPath);
        try (CSVReader csvReader = new CSVReaderBuilder(
                new InputStreamReader(resource.getInputStream(), Charset.forName("EUC-KR"))).build()) {
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
}
